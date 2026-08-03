from django.contrib import admin

from .models import NewsArticle, NewsGalleryImage


class NewsGalleryImageInline(admin.TabularInline):
    model = NewsGalleryImage
    extra = 1
    fields = ("image", "caption", "sort_order")


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "is_published",
        "is_featured",
        "published_at",
        "created_at",
    )
    list_filter = ("is_published", "is_featured", "published_at", "created_at")
    search_fields = ("title", "excerpt", "content")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    date_hierarchy = "published_at"
    inlines = [NewsGalleryImageInline]
    actions = ["publish_articles", "unpublish_articles"]

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "title",
                    "slug",
                    "excerpt",
                    "content",
                    "main_image",
                )
            },
        ),
        (
            "Publishing",
            {
                "fields": (
                    "is_published",
                    "is_featured",
                    "published_at",
                )
            },
        ),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    @admin.action(description="Publish selected articles")
    def publish_articles(self, request, queryset):
        for article in queryset:
            article.is_published = True
            article.save(update_fields=["is_published", "published_at", "updated_at"])

    @admin.action(description="Unpublish selected articles")
    def unpublish_articles(self, request, queryset):
        queryset.update(is_published=False)
