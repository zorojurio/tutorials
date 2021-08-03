from django.contrib import admin
from . import models


class BlogAdminArea(admin.AdminSite):
    site_header = 'Blog DataBase'  # h1 title of the admin page
    site_title = 'Blog Data'  # title of the admin page


class TestAdminPermissions(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False  # if this is true we have permission to add
        # false will remove the add buttin in the admin page

    def has_change_permission(self, request, obj=None):
        return False  # gives u only a read only field

    def has_delete_permission(self, request, obj=None):
        return False

    def has_view_permission(self, request, obj=None):
        return True


blog_site = BlogAdminArea(name='BlogAdmin')
blog_site.register(models.Post, TestAdminPermissions)
blog_site.register(models.Book)  # only books will have permisson to add
