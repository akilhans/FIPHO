from rest_framework import parsers, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import NewsArticle, NewsGalleryImage
from .serializers import AdminNewsArticleSerializer, NewsArticleSerializer


class NewsArticleViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NewsArticleSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None
    lookup_field = "pk"

    def get_queryset(self):
        return (
            NewsArticle.objects.filter(is_published=True)
            .prefetch_related("gallery_images")
            .order_by("-is_featured", "-published_at", "-created_at")
        )


class AdminNewsArticleViewSet(viewsets.ModelViewSet):
    serializer_class = AdminNewsArticleSerializer
    permission_classes = [permissions.IsAdminUser]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser]

    def get_queryset(self):
        return NewsArticle.objects.prefetch_related("gallery_images").order_by(
            "-created_at"
        )

    @action(detail=True, methods=["post"], url_path="gallery")
    def gallery(self, request, pk=None):
        article = self.get_object()
        images = request.FILES.getlist("images")
        if not images and request.FILES.get("image"):
            images = [request.FILES["image"]]

        if not images:
            return Response(
                {"images": ["At least one image is required."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        created = []
        next_order = article.gallery_images.count()
        captions = request.data.getlist("captions")
        for index, image in enumerate(images):
            created.append(
                NewsGalleryImage.objects.create(
                    article=article,
                    image=image,
                    caption=captions[index] if index < len(captions) else "",
                    sort_order=next_order + index,
                )
            )

        serializer = self.get_serializer(article)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AdminNewsGalleryImageDeleteView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, pk):
        try:
            image = NewsGalleryImage.objects.get(pk=pk)
        except NewsGalleryImage.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
