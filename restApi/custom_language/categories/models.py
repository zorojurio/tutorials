from django.db import models
from django.utils.translation import gettext as _
from parler.models import TranslatableModel, TranslatedFields

from lang.utils import random_string_generator, get_filename_ext
from lang.settings import LANGUAGE_CODE


def image_upload_to(instance, filename):
    name = instance.name
    random_name = random_string_generator(size=10)  # getting a random name for the file
    basename, file_extension = get_filename_ext(filename)
    new_file_name = f"{name}-{random_name}{file_extension}"
    return f"Categories/{name}/{new_file_name}"


class Category(TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(_("Name"), max_length=255, blank=True, null=True),
        description=models.TextField(_("Description"), blank=True, null=True)
    )
    meta_title = models.CharField(max_length=255, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to=image_upload_to, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Categories'
        verbose_name = 'Category'
        ordering = ['-timestamp']

    def __str__(self):
        return self.name