import base64

from django.urls import reverse
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase

from .models import NewsArticle, NewsGalleryImage

User = get_user_model()


def make_image(name="image.png"):
    return SimpleUploadedFile(
        name,
        base64.b64decode(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ),
        content_type="image/png",
    )


def make_invalid_image():
    return SimpleUploadedFile("invalid.png", b"not an image", content_type="image/png")


class NewsAPITests(APITestCase):
    def test_only_published_news_is_public(self):
        NewsArticle.objects.create(
            title="Draft article",
            content="This should not be visible.",
            main_image="news/main/draft.jpg",
            is_published=False,
        )
        published = NewsArticle.objects.create(
            title="Published article",
            excerpt="Short public summary",
            content="This should be visible.",
            main_image="news/main/published.jpg",
            is_published=True,
        )
        NewsGalleryImage.objects.create(
            article=published,
            image="news/gallery/one.jpg",
            caption="Gallery caption",
            sort_order=1,
        )

        response = self.client.get(reverse("news-list"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Published article")
        self.assertEqual(response.data[0]["excerpt"], "Short public summary")
        self.assertTrue(response.data[0]["main_image"].endswith("/media/news/main/published.jpg"))
        self.assertEqual(response.data[0]["gallery_images"][0]["caption"], "Gallery caption")

    def test_news_detail_is_public(self):
        article = NewsArticle.objects.create(
            title="Public detail",
            content="Detail content",
            main_image="news/main/detail.jpg",
            is_published=True,
        )

        response = self.client.get(reverse("news-detail", args=[article.id]))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["title"], "Public detail")


class AdminNewsAPITests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username="admin",
            password="pass",
            is_staff=True,
            is_superuser=True,
        )

    def test_admin_news_requires_staff(self):
        response = self.client.get(reverse("admin-news-list"))
        self.assertIn(response.status_code, [401, 403])

    def test_staff_can_create_update_and_delete_news(self):
        self.client.force_authenticate(user=self.admin)

        create_response = self.client.post(
            reverse("admin-news-list"),
            {
                "title": "Dashboard news",
                "excerpt": "Short summary",
                "content": "Article body",
                "main_image": make_image(),
                "is_published": "false",
                "is_featured": "true",
            },
            format="multipart",
        )

        self.assertEqual(create_response.status_code, 201)
        article_id = create_response.data["id"]
        article = NewsArticle.objects.get(pk=article_id)
        self.assertFalse(article.is_published)
        self.assertTrue(article.is_featured)

        public_response = self.client.get(reverse("news-list"))
        self.assertEqual(public_response.data, [])

        update_response = self.client.patch(
            reverse("admin-news-detail", args=[article_id]),
            {
                "title": "Published dashboard news",
                "is_published": "true",
            },
            format="multipart",
        )

        self.assertEqual(update_response.status_code, 200)
        article.refresh_from_db()
        self.assertTrue(article.is_published)
        self.assertIsNotNone(article.published_at)

        public_response = self.client.get(reverse("news-list"))
        self.assertEqual(len(public_response.data), 1)
        self.assertEqual(public_response.data[0]["title"], "Published dashboard news")

        delete_response = self.client.delete(
            reverse("admin-news-detail", args=[article_id])
        )
        self.assertEqual(delete_response.status_code, 204)
        self.assertFalse(NewsArticle.objects.filter(pk=article_id).exists())

    def test_staff_can_add_and_delete_gallery_images(self):
        self.client.force_authenticate(user=self.admin)
        article = NewsArticle.objects.create(
            title="Gallery article",
            content="Article body",
            main_image="news/main/main.jpg",
            is_published=True,
        )

        gallery_response = self.client.post(
            reverse("admin-news-gallery", args=[article.id]),
            {"images": [make_image()]},
            format="multipart",
        )

        self.assertEqual(gallery_response.status_code, 201)
        self.assertEqual(NewsGalleryImage.objects.filter(article=article).count(), 1)
        image = NewsGalleryImage.objects.get(article=article)

        delete_response = self.client.delete(
            reverse("admin-news-gallery-delete", args=[image.id])
        )

        self.assertEqual(delete_response.status_code, 204)
        self.assertFalse(NewsGalleryImage.objects.filter(pk=image.id).exists())

    def test_gallery_upload_rejects_invalid_image_content(self):
        self.client.force_authenticate(user=self.admin)
        article = NewsArticle.objects.create(
            title="Gallery article",
            content="Article body",
            main_image="news/main/main.jpg",
        )

        response = self.client.post(
            reverse("admin-news-gallery", args=[article.id]),
            {"images": [make_invalid_image()]},
            format="multipart",
        )

        self.assertEqual(response.status_code, 400)
        self.assertFalse(NewsGalleryImage.objects.filter(article=article).exists())
