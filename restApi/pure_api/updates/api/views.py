from updates.models import Updates as UpdateModel
from django.views.generic import View
from django.http import HttpResponse
from updates.api.mixins import CSRFExemptMixin
from django.views.decorators.csrf import csrf_protect


class UpdateModelDetailApiView(CSRFExemptMixin, View):
    def get(self, request, id, *args, **kwargs):
        obj = UpdateModel.objects.get(id=id)
        json_data = obj.serialize()
        return HttpResponse(json_data, content_type="application/json")

    def post(self, request, *args, **kwargs):
        return HttpResponse({}, content_type="application/json")

    def put(self, request, *args, **kwargs):
        return HttpResponse({}, content_type="application/json")

    def delete(self, request, *args, **kwargs):
        return HttpResponse({}, content_type="application/json")


class UpdateModelListApiView(CSRFExemptMixin, View):
    def get(self, request, *args, **kwargs):
        qs = UpdateModel.objects.all()
        json_data = qs.serialize()
        return HttpResponse(json_data, content_type="application/json")

    @csrf_protect
    def post(self, request, *args, **kwargs):
        return HttpResponse({}, content_type="application/json")
