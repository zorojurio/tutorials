from django.core.management import BaseCommand
from faker import Faker
from random import randrange
from search.models import Product


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()

        for i in range(50):
            Product.objects.create(
                title=faker.name(),
                description=faker.text(300),
                image=faker.image_url(),
                price=randrange(10, 100)
            )


