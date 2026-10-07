from rest_framework import serializers

MAX_FILE_SIZE = 25 * 1024 * 1024  # 25MB
IMAGE_TYPES = ["image/jpeg", "image/png"]
DOCUMENT_TYPES = ["image/jpeg", "image/png", "application/pdf"]

# Names people recognise, for the types browsers commonly send.
TYPE_NAMES = {
    "image/jpeg": "JPEG",
    "image/png": "PNG",
    "application/pdf": "PDF",
    "image/heic": "HEIC",
    "image/heif": "HEIF",
    "image/webp": "WebP",
    "image/gif": "GIF",
    "image/tiff": "TIFF",
    "image/bmp": "BMP",
    "image/avif": "AVIF",
    "application/msword": "Word",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Word",
}
APPLE_PHOTO_TYPES = {"image/heic", "image/heif"}


def _allowed_phrase(allowed_types):
    names = [TYPE_NAMES.get(content_type, content_type) for content_type in allowed_types]
    if len(names) == 1:
        return names[0]
    return f"{', '.join(names[:-1])} or {names[-1]}"


def validate_file_size(file, max_size=MAX_FILE_SIZE):
    if file.size > max_size:
        max_mb = max_size / (1024 * 1024)
        raise serializers.ValidationError(
            f"This file is {file.size / (1024 * 1024):.1f} MB. "
            f"Files must not exceed {max_mb:.0f} MB."
        )


def validate_file_type(file, allowed_types):
    content_type = file.content_type or ""
    if content_type not in allowed_types:
        uploaded = TYPE_NAMES.get(content_type) or content_type or "an unrecognised type"
        message = (
            f"This file is {uploaded}, which is not accepted. "
            f"Please upload a {_allowed_phrase(allowed_types)} file."
        )
        if content_type in APPLE_PHOTO_TYPES:
            message += " On iPhone or Mac, export or save the photo as JPEG first."
        raise serializers.ValidationError(message)


def validate_image_file(file):
    validate_file_size(file)
    validate_file_type(file, IMAGE_TYPES)


def validate_document_file(file):
    validate_file_size(file)
    validate_file_type(file, DOCUMENT_TYPES)
