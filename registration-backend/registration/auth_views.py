from datetime import timedelta

from django.conf import settings
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


ACCESS_COOKIE_NAME = "access_token"
REFRESH_COOKIE_NAME = "refresh_token"

DEFAULT_ACCESS_LIFETIME = 60 * 60
DEFAULT_REFRESH_LIFETIME = 60 * 60 * 24


def _lifetime_seconds(key, default):
    lifetime = getattr(settings, "SIMPLE_JWT", {}).get(key)
    if isinstance(lifetime, timedelta):
        return int(lifetime.total_seconds())
    return default


def _set_auth_cookies(response, access=None, refresh=None):
    secure = not settings.DEBUG
    if access:
        response.set_cookie(
            ACCESS_COOKIE_NAME,
            access,
            max_age=_lifetime_seconds("ACCESS_TOKEN_LIFETIME", DEFAULT_ACCESS_LIFETIME),
            httponly=True,
            secure=secure,
            samesite="Lax",
            path="/",
        )
    if refresh:
        response.set_cookie(
            REFRESH_COOKIE_NAME,
            refresh,
            max_age=_lifetime_seconds("REFRESH_TOKEN_LIFETIME", DEFAULT_REFRESH_LIFETIME),
            httponly=True,
            secure=secure,
            samesite="Lax",
            path="/",
        )


class CookieTokenObtainPairView(TokenObtainPairView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.status_code == 200 and isinstance(response.data, dict):
            _set_auth_cookies(
                response,
                access=response.data.get("access"),
                refresh=response.data.get("refresh"),
            )
        return super().finalize_response(request, response, *args, **kwargs)


class CookieTokenRefreshView(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.status_code == 200 and isinstance(response.data, dict):
            _set_auth_cookies(
                response,
                access=response.data.get("access"),
                refresh=response.data.get("refresh"),
            )
        return super().finalize_response(request, response, *args, **kwargs)


class LogoutView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie(ACCESS_COOKIE_NAME, path="/")
        response.delete_cookie(REFRESH_COOKIE_NAME, path="/")
        return response
