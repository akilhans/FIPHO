from django.db import models

from core.utils.file_cleanup import register_file_cleanup_signals


class MediaAlbum(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    external_url = models.URLField(blank=True)
    external_url_label = models.CharField(max_length=80, blank=True)
    is_published = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "-created_at"]

    def __str__(self):
        return self.title


class MediaImage(models.Model):
    album = models.ForeignKey(
        MediaAlbum,
        on_delete=models.CASCADE,
        related_name="images",
    )
    image = models.ImageField(upload_to="media_library/images/", blank=True, null=True)
    external_url = models.CharField(max_length=500, blank=True)
    title = models.CharField(max_length=255, blank=True)
    alt_text = models.CharField(max_length=255, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.title or self.alt_text or f"Image for {self.album}"


register_file_cleanup_signals(MediaImage, ["image"])
