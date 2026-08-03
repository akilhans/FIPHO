from __future__ import annotations

from collections.abc import Sequence
from typing import Any

from django.db import models
from django.db.models.signals import post_delete, pre_save


def _delete_file_if_exists(file_field: Any) -> None:
    if file_field:
        file_field.delete(save=False)


def register_file_cleanup_signals(
    model_cls: type[models.Model], file_fields: Sequence[str]
) -> None:
    """Attach signals to delete files on model delete or file replacement."""

    fields = tuple(file_fields)

    def _delete_files(sender: type[models.Model], instance: models.Model, **kwargs) -> None:
        for field in fields:
            _delete_file_if_exists(getattr(instance, field, None))

    def _delete_old_files(
        sender: type[models.Model], instance: models.Model, **kwargs
    ) -> None:
        if not instance.pk:
            return

        try:
            old_instance = sender.objects.get(pk=instance.pk)
        except sender.DoesNotExist:
            return

        for field in fields:
            old_file = getattr(old_instance, field, None)
            new_file = getattr(instance, field, None)
            if old_file and old_file != new_file:
                _delete_file_if_exists(old_file)

    post_delete.connect(
        _delete_files,
        sender=model_cls,
        dispatch_uid=f"{model_cls.__name__}_file_cleanup_delete",
        weak=False,
    )
    pre_save.connect(
        _delete_old_files,
        sender=model_cls,
        dispatch_uid=f"{model_cls.__name__}_file_cleanup_change",
        weak=False,
    )
