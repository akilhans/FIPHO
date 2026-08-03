from rest_framework import serializers

from core.validators import validate_image_file

from .models import NewsArticle, NewsGalleryImage


class NewsGalleryImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = NewsGalleryImage
        fields = ["id", "image", "caption", "sort_order"]

    def get_image(self, obj):
        request = self.context.get("request")
        if not obj.image:
            return ""
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url


class NewsArticleSerializer(serializers.ModelSerializer):
    main_image = serializers.SerializerMethodField()
    gallery_images = NewsGalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = NewsArticle
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "content",
            "main_image",
            "gallery_images",
            "is_featured",
            "published_at",
            "created_at",
            "updated_at",
        ]

    def get_main_image(self, obj):
        request = self.context.get("request")
        if not obj.main_image:
            return ""
        url = obj.main_image.url
        return request.build_absolute_uri(url) if request else url


class AdminNewsGalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsGalleryImage
        fields = ["id", "image", "caption", "sort_order", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_image(self, value):
        validate_image_file(value)
        return value


class AdminNewsArticleSerializer(serializers.ModelSerializer):
    gallery_images = AdminNewsGalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = NewsArticle
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "content",
            "main_image",
            "gallery_images",
            "is_published",
            "is_featured",
            "published_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "slug", "created_at", "updated_at"]

    def validate(self, attrs):
        is_published = attrs.get(
            "is_published",
            getattr(self.instance, "is_published", False),
        )
        published_at = attrs.get(
            "published_at",
            getattr(self.instance, "published_at", None),
        )
        if not is_published and published_at:
            attrs["published_at"] = None
        return attrs
