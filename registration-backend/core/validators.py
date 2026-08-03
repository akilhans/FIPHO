from rest_framework import serializers

MAX_FILE_SIZE = 25 * 1024 * 1024  # 25MB
IMAGE_TYPES = ["image/jpeg", "image/png"]
DOCUMENT_TYPES = ["image/jpeg", "image/png", "application/pdf"]


def validate_file_size(file, max_size=MAX_FILE_SIZE):
    if file.size > max_size:
        max_mb = max_size / (1024 * 1024)
        raise serializers.ValidationError(f"File size must not exceed {max_mb:.0f}MB.")


def validate_file_type(file, allowed_types):
    if file.content_type not in allowed_types:
        raise serializers.ValidationError(
            f"Unsupported file type '{file.content_type}'. Allowed: {', '.join(allowed_types)}"
        )


def validate_image_file(file):
    validate_file_size(file)
    validate_file_type(file, IMAGE_TYPES)


def validate_document_file(file):
    validate_file_size(file)
    validate_file_type(file, DOCUMENT_TYPES)
