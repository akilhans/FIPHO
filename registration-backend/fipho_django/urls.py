from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path, re_path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

from registration.auth_views import (
    CookieTokenObtainPairView,
    CookieTokenRefreshView,
    LogoutView,
)
from registration.views import serve_protected_media


def root_view(request):
    return JsonResponse({"message": "API is live"}, status=200)


api_urlpatterns = [
    path("", include("registration.urls")),
    path("", include("news.urls")),
    path("", include("media_library.urls")),
]


urlpatterns = [
    path("", root_view),
    path("admin/", admin.site.urls),
    path("api/", include(api_urlpatterns)),
    path("api/token/", CookieTokenObtainPairView.as_view()),
    path("api/token/refresh/", CookieTokenRefreshView.as_view()),
    path("api/logout/", LogoutView.as_view()),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    re_path(r"^media/(?P<path>.*)$", serve_protected_media),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
