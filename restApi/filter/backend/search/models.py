from django.db import models


def image_upload(instance):
    return f"{instance.title}.jpg"


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=1000)
    image = models.ImageField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.title
