from django.conf import settings
from django.db import models
import json


def upload_updae_image(instance, filename):
    return f"updates/{instance.user}/{filename}"


class UpdateQuerySet(models.QuerySet):
    def serialize(self):
        list_values = list(self.values('user', 'content', 'image'))
        print(self.values('user', 'content', 'image')) # this gives a queryset
        return json.dumps(list_values)


class UpdateManager(models.Manager):
    def get_queryset(self):
        return UpdateQuerySet(self.model, using=self._db)


class Updates(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to=upload_updae_image, blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = UpdateManager()

    def __str__(self):
        return self.content or ""

    # this method is used for the one object to convert it into json format
    def serialize(self):
        image = self.image
        if image:
            image = image.url
        data = {
            'id': self.id,
            'user': self.user.username,
            'content': self.content,
            'image': image
        }
        return json.dumps(data)
