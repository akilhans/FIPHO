import logging

from django.db import IntegrityError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler

logger = logging.getLogger("django.request")


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        return response

    if isinstance(exc, IntegrityError):
        logger.warning("IntegrityError: %s", exc)
        return Response(
            {"detail": "A database constraint was violated. Please check your data."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if isinstance(exc, ValueError):
        logger.warning("ValueError: %s", exc)
        return Response(
            {"detail": "Invalid data provided."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    logger.error("Unhandled exception: %s", exc, exc_info=True)
    return Response(
        {"detail": "An unexpected error occurred."},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )
