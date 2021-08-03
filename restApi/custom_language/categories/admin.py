from django.contrib import admin
from parler.admin import TranslatableAdmin

from categories.models import Category


class CategoryAdmin(TranslatableAdmin):
    list_display = ('name', 'description')
    fieldsets = (
        (None, {
            'fields': (
                'name',
                'description',
                'meta_title',
                'meta_description',
                'image',
            ),

        }),
    )


admin.site.register(Category, CategoryAdmin)
