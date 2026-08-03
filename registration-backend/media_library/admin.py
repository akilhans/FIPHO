from django.contrib import admin

from .models import MediaAlbum, MediaImage


class MediaImageInline(admin.TabularInline):
    model = MediaImage
    extra = 1
    fields = ("image", "external_url", "title", "alt_text", "sort_order")


@admin.register(MediaAlbum)
class MediaAlbumAdmin(admin.ModelAdmin):
    list_display = ("title", "is_published", "sort_order", "created_at")
    list_filter = ("is_published", "created_at")
    search_fields = ("title", "description")
    readonly_fields = ("created_at", "updated_at")
    inlines = [MediaImageInline]
    actions = ["publish_albums", "unpublish_albums"]

    @admin.action(description="Publish selected albums")
    def publish_albums(self, request, queryset):
        queryset.update(is_published=True)

    @admin.action(description="Unpublish selected albums")
    def unpublish_albums(self, request, queryset):
        queryset.update(is_published=False)
