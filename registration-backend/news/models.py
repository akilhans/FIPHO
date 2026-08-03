from django.db import models
from django.utils import timezone
from django.utils.text import slugify

from core.utils.file_cleanup import register_file_cleanup_signals


class NewsArticle(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=280, unique=True, blank=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    main_image = models.ImageField(upload_to="news/main/")
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-is_featured", "-published_at", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "news"
            slug = base_slug
            counter = 2
            while NewsArticle.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug

        if self.is_published and self.published_at is None:
            self.published_at = timezone.now()

        super().save(*args, **kwargs)


class NewsGalleryImage(models.Model):
    article = models.ForeignKey(
        NewsArticle,
        on_delete=models.CASCADE,
        related_name="gallery_images",
    )
    image = models.ImageField(upload_to="news/gallery/")
    caption = models.CharField(max_length=255, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.caption or f"Gallery image for {self.article}"


register_file_cleanup_signals(NewsArticle, ["main_image"])
register_file_cleanup_signals(NewsGalleryImage, ["image"])
