from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL


def upload_to(instance, filename):
    return f"status/{instance.user}/{filename}"


class StatusQuerySet(models.QuerySet):
    pass


class StatusManager(models.Manager):
    def get_queryset(self):
        return StatusQuerySet(self.model, using=self._db)


class Status(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = StatusManager()

    def __str__(self):
        return str(self.user.username)

    class Meta:
        verbose_name = "Status post"
        verbose_name_plural = "Status posts"

    @property
    def owner(self):
        return self.user
