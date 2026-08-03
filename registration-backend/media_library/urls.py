from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AdminMediaAlbumViewSet,
    AdminMediaImageDeleteView,
    MediaAlbumViewSet,
)


router = DefaultRouter()
router.register("admin/media-albums", AdminMediaAlbumViewSet, basename="admin-media-album")
router.register("media-albums", MediaAlbumViewSet, basename="media-album")

urlpatterns = [
    path(
        "admin/media-images/<int:pk>/",
        AdminMediaImageDeleteView.as_view(),
        name="admin-media-image-delete",
    ),
    path("", include(router.urls)),
]
