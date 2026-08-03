from rest_framework import parsers, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MediaAlbum, MediaImage
from .serializers import MediaAlbumSerializer, MediaImageSerializer


class MediaAlbumViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MediaAlbumSerializer
    pagination_class = None
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return (
            MediaAlbum.objects.filter(is_published=True)
            .prefetch_related("images")
            .order_by("sort_order", "-created_at")
        )


class AdminMediaAlbumViewSet(viewsets.ModelViewSet):
    serializer_class = MediaAlbumSerializer
    permission_classes = [permissions.IsAdminUser]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser]

    def get_queryset(self):
        return MediaAlbum.objects.prefetch_related("images").order_by(
            "sort_order",
            "-created_at",
        )

    @action(detail=True, methods=["post"], url_path="images")
    def images(self, request, pk=None):
        album = self.get_object()
        files = request.FILES.getlist("images")
        if not files and request.FILES.get("image"):
            files = [request.FILES["image"]]

        if not files:
            return Response(
                {"images": ["At least one image is required."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        next_order = album.images.count()
        titles = request.data.getlist("titles")
        alt_texts = request.data.getlist("alt_texts")
        serializers = []
        for index, image in enumerate(files):
            image_serializer = MediaImageSerializer(
                data={
                    "image": image,
                    "title": titles[index] if index < len(titles) else "",
                    "alt_text": alt_texts[index] if index < len(alt_texts) else "",
                    "sort_order": next_order + index,
                },
                context=self.get_serializer_context(),
            )
            image_serializer.is_valid(raise_exception=True)
            serializers.append(image_serializer)
        for image_serializer in serializers:
            image_serializer.save(album=album)

        serializer = self.get_serializer(album)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AdminMediaImageDeleteView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, pk):
        try:
            image = MediaImage.objects.get(pk=pk)
        except MediaImage.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
