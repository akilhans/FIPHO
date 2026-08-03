from rest_framework import serializers

from .models import MediaAlbum, MediaImage


class MediaImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = MediaImage
        fields = [
            "id",
            "image",
            "image_url",
            "external_url",
            "title",
            "alt_text",
            "sort_order",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url
        return obj.external_url


class MediaAlbumSerializer(serializers.ModelSerializer):
    images = MediaImageSerializer(many=True, read_only=True)

    class Meta:
        model = MediaAlbum
        fields = [
            "id",
            "title",
            "description",
            "external_url",
            "external_url_label",
            "is_published",
            "sort_order",
            "images",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
