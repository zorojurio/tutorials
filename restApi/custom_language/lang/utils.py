import os
import random
import string

from django.utils.text import slugify


def get_filename_ext(filepath):
    # getting the file name from the file directory
    base_name = os.path.basename(filepath)
    # splitting the extention and the file name
    name, ext = os.path.splitext(base_name)
    return name, ext


def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def random_number_generator(size=20, chars=string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def unique_slug_generator(instance, new_slug=None):
    """
    This is for a Django project and it assumes your instance
    has a model with a slug field and a title character (char) field.
    """
    if new_slug is not None:
        slug = new_slug
    else:
        slug = slugify(instance.title)

    Klass = instance.__class__
    qs_exists = Klass.objects.filter(business_username=slug).exists()
    if qs_exists:
        new_slug = "{slug}-{randstr}".format(
            slug=slug,
            randstr=random_string_generator(size=10)
        )
        return unique_slug_generator(instance, new_slug=new_slug)
    return slug


def unique_order_id_generator(instance):
    ad_profile_new_id = random_string_generator(15)
    Klass = instance.__class__
    qs_exists = Klass.objects.filter(ad_profile_id=ad_profile_new_id).exists()
    if qs_exists:
        return unique_slug_generator(instance)
    return ad_profile_new_id



