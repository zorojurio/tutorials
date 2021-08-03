from django.contrib import admin
from status.models import Status
from status.forms import StatusForm


class StatusAdmin(admin.ModelAdmin):
    list_display = ['user', 'content']
    form = StatusForm

    class Meta:
        model = Status


admin.site.register(Status, StatusAdmin)
