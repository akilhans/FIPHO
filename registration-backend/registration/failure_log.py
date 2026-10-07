"""Record rejected detailed-registration submissions.

Each rejection is saved as a RegistrationFailure row and written to the log,
so organisers can see exactly why someone could not register. Only the
reasons and the shape of the submission are kept: no names, passport
numbers, contact details, filenames, or file contents.
"""

import json
import logging
import re
from pathlib import Path

from django.core.exceptions import ValidationError
from django.core.validators import validate_ipv46_address

from .models import Country, RegistrationFailure

logger = logging.getLogger("django.request")

DELEGATION_NAME_KEY = re.compile(r"delegations\[(\d+)]\[official_delegation_name]")


def flatten_errors(detail, path=""):
    """Turn a DRF error structure into [{"field": path, "message": text}].

    Nested lists hold one entry per delegation or person, with empty entries
    for the valid ones, so the list index becomes part of the path, e.g.
    "delegations[0].team_leaders[1].passport_scan".
    """
    if isinstance(detail, dict):
        errors = []
        for key, value in detail.items():
            if key in ("non_field_errors", "detail"):
                child = path
            else:
                child = f"{path}.{key}" if path else str(key)
            errors.extend(flatten_errors(value, child))
        return errors
    if isinstance(detail, list):
        errors = []
        for index, item in enumerate(detail):
            if isinstance(item, (dict, list)):
                if item:
                    errors.extend(flatten_errors(item, f"{path}[{index}]"))
            else:
                errors.append({"field": path, "message": str(item)})
        return errors
    return [{"field": path, "message": str(detail)}]


def _upload_summary(files):
    uploads = []
    for key in files:
        for uploaded in files.getlist(key):
            uploads.append({
                "field": key,
                "content_type": uploaded.content_type or "",
                "extension": Path(uploaded.name or "").suffix.lower()[:12],
                "size_bytes": uploaded.size,
            })
    return uploads


def _country_name(raw_value):
    if not raw_value:
        return ""
    if str(raw_value).isdigit():
        country = Country.objects.filter(pk=int(raw_value)).first()
        if country:
            return country.name
    return f"unknown ({str(raw_value)[:40]})"


def _delegation_names(data):
    names = {}
    for key, value in data.items():
        match = DELEGATION_NAME_KEY.fullmatch(key)
        if match:
            names[int(match.group(1))] = str(value)[:255]
    return [names[index] for index in sorted(names)]


def record_registration_failure(request, reason, detail, status_code=400):
    """Save and log why a submission was rejected. Never raises."""
    try:
        data = request.POST
        uploads = _upload_summary(request.FILES)
        failure = RegistrationFailure(
            reason=reason,
            status_code=status_code,
            errors=flatten_errors(detail),
            country_name=_country_name(data.get("country")),
            delegation_names=_delegation_names(data),
            number_of_teams=str(data.get("number_of_teams", ""))[:10],
            uploads=uploads,
            total_upload_bytes=sum(item["size_bytes"] for item in uploads),
            ip_address=_valid_ip(getattr(request, "client_ip", None)),
            user_agent=str(getattr(request, "user_agent", "") or "")[:512],
        )
        failure.save()
        logger.warning(
            "Registration rejected id=%s reason=%s country=%s errors=%s uploads=%s",
            failure.pk,
            reason,
            failure.country_name or "-",
            json.dumps(failure.errors, ensure_ascii=False),
            json.dumps(
                [
                    f"{item['field']}={item['content_type'] or '?'}/{item['size_bytes']}B"
                    for item in uploads
                ]
            ),
        )
    except Exception:
        logger.exception("Could not record a rejected registration submission")


def _valid_ip(value):
    if not value or value == "unknown":
        return None
    try:
        validate_ipv46_address(value)
    except ValidationError:
        return None
    return value
