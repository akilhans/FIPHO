import base64

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework.test import APITestCase

from .models import MediaAlbum, MediaImage


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


class MediaAlbumAPITests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username="admin",
            password="pass",
            is_staff=True,
            is_superuser=True,
        )

    def test_public_api_returns_only_published_albums(self):
        published = MediaAlbum.objects.create(
            title="Published album",
            is_published=True,
            sort_order=1,
        )
        MediaImage.objects.create(
            album=published,
            external_url="/media/group.jpg",
            title="Group photo",
            alt_text="Group photo",
        )
        MediaAlbum.objects.create(title="Draft album", is_published=False)

        response = self.client.get(reverse("media-album-list"))

        self.assertEqual(response.status_code, 200)
        titles = {album["title"] for album in response.data}
        self.assertIn("Published album", titles)
        self.assertNotIn("Draft album", titles)
        album_data = next(
            album for album in response.data if album["title"] == "Published album"
        )
        self.assertEqual(album_data["images"][0]["image_url"], "/media/group.jpg")

    def test_admin_api_requires_staff(self):
        response = self.client.get(reverse("admin-media-album-list"))
        self.assertIn(response.status_code, [401, 403])

    def test_staff_can_create_update_and_delete_album(self):
        self.client.force_authenticate(user=self.admin)

        create_response = self.client.post(
            reverse("admin-media-album-list"),
            {
                "title": "Admin album",
                "description": "Album description",
                "is_published": "false",
                "sort_order": "5",
            },
            format="multipart",
        )

        self.assertEqual(create_response.status_code, 201)
        album_id = create_response.data["id"]

        update_response = self.client.patch(
            reverse("admin-media-album-detail", args=[album_id]),
            {"is_published": "true"},
            format="multipart",
        )

        self.assertEqual(update_response.status_code, 200)
        self.assertTrue(MediaAlbum.objects.get(pk=album_id).is_published)

        delete_response = self.client.delete(
            reverse("admin-media-album-detail", args=[album_id])
        )
        self.assertEqual(delete_response.status_code, 204)
        self.assertFalse(MediaAlbum.objects.filter(pk=album_id).exists())

    def test_staff_can_add_and_delete_album_images(self):
        self.client.force_authenticate(user=self.admin)
        album = MediaAlbum.objects.create(title="Album", is_published=True)

        upload_response = self.client.post(
            reverse("admin-media-album-images", args=[album.id]),
            {"images": [make_image()]},
            format="multipart",
        )

        self.assertEqual(upload_response.status_code, 201)
        self.assertEqual(MediaImage.objects.filter(album=album).count(), 1)
        image = MediaImage.objects.get(album=album)

        delete_response = self.client.delete(
            reverse("admin-media-image-delete", args=[image.id])
        )

        self.assertEqual(delete_response.status_code, 204)
        self.assertFalse(MediaImage.objects.filter(pk=image.id).exists())

    def test_album_upload_rejects_invalid_image_content(self):
        self.client.force_authenticate(user=self.admin)
        album = MediaAlbum.objects.create(title="Album")

        response = self.client.post(
            reverse("admin-media-album-images", args=[album.id]),
            {"images": [make_invalid_image()]},
            format="multipart",
        )

        self.assertEqual(response.status_code, 400)
        self.assertFalse(MediaImage.objects.filter(album=album).exists())
