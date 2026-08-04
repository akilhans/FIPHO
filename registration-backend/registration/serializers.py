from datetime import date

from rest_framework import serializers
from django.conf import settings
from django.db import IntegrityError, transaction
import pytz
from core.validators import validate_image_file, validate_document_file
from .models import (
    Contestant,
    Country,
    Delegation,
    DetailedRegistration,
    ParticipationRequest,
    Role,
    Subject,
    TeamLeader,
)


ALLOWED_GENDERS = {"Female", "Male"}
DETAILED_REGISTRATION_MAX_TEAM_LEADERS = 2
DETAILED_REGISTRATION_MAX_CONTESTANTS = 5
CONTESTANT_ELIGIBILITY_CUTOFF = date(2006, 5, 1)
CONTESTANT_ELIGIBILITY_MESSAGE = (
    "Contestants must be under 20 on May 1, 2026 and must not be enrolled "
    "in a university or another higher education institution."
)


def _add_required_field_errors(data, required_fields, instance=None):
    errors = {}
    for field_name, message in required_fields.items():
        value = (
            data[field_name]
            if field_name in data
            else getattr(instance, field_name, None)
        )
        if not value:
            errors[field_name] = message
    if errors:
        raise serializers.ValidationError(errors)


def _get_existing_or_new_value(data, field_name, instance=None):
    if data.get(field_name) is not None:
        return data.get(field_name)
    if instance is not None:
        return getattr(instance, field_name, None)
    return None


# ----------------- GENERAL SERIALIZERS ----------------- #
class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name']


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']


# ----------------- PARTICIPATION REQUEST SERIALIZER ----------------- #
class ParticipationRequestSerializer(serializers.ModelSerializer):
    country = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all())
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all())
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all())

    class Meta:
        model = ParticipationRequest
        fields = ['id', 'full_name', 'country', 'role', 'subject', 'email', 'whatsapp_number',
                  'additional_number', 'number_of_students', 'number_of_team_leaders',
                  'created_at', 'updated_at']

    def validate_email(self, value):
        if self.instance and self.instance.email == value:
            return value
        if ParticipationRequest.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def validate(self, data):
        max_students = getattr(settings, "FIPHO_MAX_STUDENTS", 5)
        max_team_leaders = getattr(settings, "FIPHO_MAX_TEAM_LEADERS", 2)
        if data.get('number_of_students', 0) > max_students:
            raise serializers.ValidationError({"number_of_students": f"Maximum {max_students} students allowed."})
        if data.get('number_of_team_leaders', 0) > max_team_leaders:
            raise serializers.ValidationError({"number_of_team_leaders": f"Maximum {max_team_leaders} team leaders allowed."})
        return data

    def to_representation(self, instance):
        data = super().to_representation(instance)
        tz = pytz.timezone(settings.TIME_ZONE)

        if instance.created_at:
            data['created_at'] = instance.created_at.astimezone(tz).strftime('%Y-%m-%dT%H:%M:%S%z')
        if instance.updated_at:
            data['updated_at'] = instance.updated_at.astimezone(tz).strftime('%Y-%m-%dT%H:%M:%S%z')

        data['country'] = CountrySerializer(instance.country).data
        data['role'] = RoleSerializer(instance.role).data
        data['subject'] = SubjectSerializer(instance.subject).data
        return data


# ----------------- TEAM LEADER SERIALIZER ----------------- #
class TeamLeaderSerializer(serializers.ModelSerializer):
    delegation = serializers.PrimaryKeyRelatedField(queryset=Delegation.objects.all(), required=False)
    full_name = serializers.CharField(required=False, allow_blank=True)
    badge_name = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    gender = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    passport_number = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    phone_number = serializers.CharField(required=False, allow_blank=True)
    role = serializers.CharField(required=False, allow_blank=True)
    t_shirt_size = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    food_type = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    dietary_requirements = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    passport_scan = serializers.FileField(required=False, allow_null=True)
    id_photo = serializers.FileField(required=False, allow_null=True)
    consent_form = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = TeamLeader
        fields = [
            'id',
            'delegation',
            'full_name',
            'badge_name',
            'date_of_birth',
            'gender',
            'passport_number',
            'email',
            'phone_number',
            'role',
            't_shirt_size',
            'food_type',
            'dietary_requirements',
            'passport_scan',
            'id_photo',
            'consent_form',
        ]

    def validate(self, data):
        if self.parent is None and self.instance is None and not data.get("delegation"):
            raise serializers.ValidationError(
                {"delegation": "Delegation is required."}
            )
        _add_required_field_errors(
            data,
            {
                "full_name": "Full name is required.",
                "badge_name": "Badge name is required.",
                "date_of_birth": "Date of birth is required.",
                "gender": "Gender is required.",
                "passport_number": "Passport number is required.",
                "email": "Email is required.",
                "phone_number": "Phone number is required.",
                "role": "Role is required.",
                "t_shirt_size": "T-shirt size is required.",
                "food_type": "Food type is required.",
                "passport_scan": "Passport scan is required.",
                "id_photo": "ID photo is required.",
                "consent_form": "Consent form is required.",
            },
            self.instance,
        )
        gender = _get_existing_or_new_value(data, "gender", self.instance)
        if gender and gender not in ALLOWED_GENDERS:
            raise serializers.ValidationError(
                {"gender": "Gender must be either Female or Male."}
            )
        return data

    def validate_passport_scan(self, value):
        if value:
            validate_document_file(value)
        return value

    def validate_id_photo(self, value):
        if value:
            validate_image_file(value)
        return value

    def validate_consent_form(self, value):
        if value:
            validate_document_file(value)
        return value


# ----------------- CONTESTANT SERIALIZER ----------------- #
class ContestantSerializer(serializers.ModelSerializer):
    delegation = serializers.PrimaryKeyRelatedField(queryset=Delegation.objects.all(), required=False)
    competition_subject = serializers.CharField(max_length=50, required=False, allow_blank=True)
    full_name = serializers.CharField(required=False, allow_blank=True)
    badge_name = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    passport_number = serializers.CharField(required=False, allow_blank=True)
    passport_expiry_date = serializers.DateField(required=False, allow_null=True)
    gender = serializers.CharField(required=False, allow_blank=True)
    t_shirt_size = serializers.CharField(required=False, allow_blank=True)
    food_type = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    dietary_requirements = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    special_requirements = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    passport_scan = serializers.FileField(required=False, allow_null=True)
    id_photo = serializers.FileField(required=False, allow_null=True)
    commitment_form = serializers.FileField(required=False, allow_null=True)
    consent_form = serializers.FileField(required=False, allow_null=True)
    parental_consent_form = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Contestant
        fields = [
            'id',
            'delegation',
            'full_name',
            'badge_name',
            'date_of_birth',
            'gender',
            'competition_subject',
            'passport_number',
            'passport_expiry_date',
            't_shirt_size',
            'food_type',
            'dietary_requirements',
            'special_requirements',
            'passport_scan',
            'id_photo',
            'commitment_form',
            'consent_form',
            'parental_consent_form',
        ]

    def validate(self, data):
        if self.parent is None and self.instance is None and not data.get("delegation"):
            raise serializers.ValidationError(
                {"delegation": "Delegation is required."}
            )
        _add_required_field_errors(
            data,
            {
                "full_name": "Full name is required.",
                "badge_name": "Badge name is required.",
                "date_of_birth": "Date of birth is required.",
                "gender": "Gender is required.",
                "competition_subject": "Competition subject is required.",
                "passport_number": "Passport number is required.",
                "passport_expiry_date": "Passport expiry date is required.",
                "t_shirt_size": "T-shirt size is required.",
                "food_type": "Food type is required.",
                "passport_scan": "Passport scan is required.",
                "id_photo": "ID photo is required.",
                "commitment_form": "Commitment form is required.",
                "consent_form": "Consent form is required.",
            },
            self.instance,
        )
        gender = _get_existing_or_new_value(data, "gender", self.instance)
        if gender and gender not in ALLOWED_GENDERS:
            raise serializers.ValidationError(
                {"gender": "Gender must be either Female or Male."}
            )
        dob = _get_existing_or_new_value(data, "date_of_birth", self.instance)
        if dob and dob <= CONTESTANT_ELIGIBILITY_CUTOFF:
            raise serializers.ValidationError(
                {"date_of_birth": CONTESTANT_ELIGIBILITY_MESSAGE}
            )
        return data

    def validate_passport_scan(self, value):
        if value:
            validate_document_file(value)
        return value

    def validate_id_photo(self, value):
        if value:
            validate_image_file(value)
        return value

    def validate_parental_consent_form(self, value):
        if value:
            validate_document_file(value)
        return value

    def validate_commitment_form(self, value):
        if value:
            validate_document_file(value)
        return value

    def validate_consent_form(self, value):
        if value:
            validate_document_file(value)
        return value


class DelegationSerializer(serializers.ModelSerializer):
    team_leaders = TeamLeaderSerializer(many=True)
    contestants = ContestantSerializer(many=True)

    class Meta:
        model = Delegation
        fields = [
            "id",
            "official_delegation_name",
            "position",
            "team_leaders",
            "contestants",
        ]

    def validate_team_leaders(self, value):
        if len(value) > DETAILED_REGISTRATION_MAX_TEAM_LEADERS:
            raise serializers.ValidationError(
                "Each delegation may have up to 2 team leaders."
            )
        return value

    def validate_contestants(self, value):
        if len(value) > DETAILED_REGISTRATION_MAX_CONTESTANTS:
            raise serializers.ValidationError(
                "Each delegation may have up to 5 contestants."
            )
        return value


# ----------------- DETAILED REGISTRATION SERIALIZER ----------------- #
class DetailedRegistrationSerializer(serializers.ModelSerializer):
    country = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all())
    delegations = DelegationSerializer(many=True)

    class Meta:
        model = DetailedRegistration
        fields = [
            "id",
            "country",
            "number_of_teams",
            "confirm_information",
            "agree_rules",
            "delegations",
            "created_at",
            "updated_at",
        ]

    def validate_delegations(self, value):
        if not value:
            raise serializers.ValidationError("Add at least one delegation.")
        if len(value) > 10:
            raise serializers.ValidationError("Maximum 10 delegations allowed.")
        positions = [delegation["position"] for delegation in value]
        if positions != list(range(1, len(value) + 1)):
            raise serializers.ValidationError(
                "Delegation positions must be consecutive and start at 1."
            )
        return value

    def validate(self, data):
        delegations = data.get("delegations")
        number_of_teams = data.get(
            "number_of_teams",
            self.instance.number_of_teams if self.instance else None,
        )
        if delegations is not None and number_of_teams != len(delegations):
            raise serializers.ValidationError(
                {"number_of_teams": "Must match the number of delegation groups."}
            )

        confirm_info = data.get(
            "confirm_information",
            self.instance.confirm_information if self.instance else None,
        )
        agree_rules = data.get(
            "agree_rules",
            self.instance.agree_rules if self.instance else None,
        )
        if not confirm_info or not agree_rules:
            raise serializers.ValidationError(
                "Must confirm information accuracy and agree to rules."
            )
        return data

    @staticmethod
    def _create_delegations(registration, delegations_data):
        for delegation_data in delegations_data:
            team_leaders_data = delegation_data.pop("team_leaders")
            contestants_data = delegation_data.pop("contestants")
            delegation = Delegation.objects.create(
                registration=registration,
                **delegation_data,
            )
            for leader_data in team_leaders_data:
                leader_data["delegation"] = delegation
                TeamLeader.objects.create(**leader_data)
            for contestant_data in contestants_data:
                contestant_data["delegation"] = delegation
                Contestant.objects.create(**contestant_data)

    def create(self, validated_data):
        delegations_data = validated_data.pop("delegations")
        try:
            with transaction.atomic():
                registration = DetailedRegistration.objects.create(**validated_data)
                self._create_delegations(registration, delegations_data)
        except IntegrityError as error:
            raise serializers.ValidationError(
                {"detail": f"Database error: {error}"}
            ) from error
        return registration

    def update(self, instance, validated_data):
        delegations_data = validated_data.pop("delegations", None)
        try:
            with transaction.atomic():
                instance = super().update(instance, validated_data)
                if delegations_data is not None:
                    instance.delegations.all().delete()
                    self._create_delegations(instance, delegations_data)
        except IntegrityError as error:
            raise serializers.ValidationError(
                {"detail": f"Database error: {error}"}
            ) from error
        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)
        tz = pytz.timezone(settings.TIME_ZONE)
        if instance.created_at:
            data["created_at"] = instance.created_at.astimezone(tz).strftime(
                "%Y-%m-%dT%H:%M:%S%z"
            )
        if instance.updated_at:
            data["updated_at"] = instance.updated_at.astimezone(tz).strftime(
                "%Y-%m-%dT%H:%M:%S%z"
            )
        data["country"] = CountrySerializer(instance.country).data
        return data
