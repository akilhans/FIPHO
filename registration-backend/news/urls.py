from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AdminNewsArticleViewSet,
    AdminNewsGalleryImageDeleteView,
    NewsArticleViewSet,
)


router = DefaultRouter()
router.register("admin/news", AdminNewsArticleViewSet, basename="admin-news")
router.register("news", NewsArticleViewSet, basename="news")

urlpatterns = [
    path(
        "admin/news/gallery/<int:pk>/",
        AdminNewsGalleryImageDeleteView.as_view(),
        name="admin-news-gallery-delete",
    ),
    path("", include(router.urls)),
]
