import json

from django.http import JsonResponse, HttpResponse
from django.views.generic import View
from updates.mixins import JsonResponseMixin
from updates.models import Updates
from django.core.serializers import serialize


def detail_view(request):
    data = {
        "count": 1000,
        "content": "some new data"
    }
    json_data = json.dumps(data)
    return HttpResponse(json_data, content_type='application/json')


def new_json(request):
    data = {
        "new": "this is new data"
    }
    return JsonResponse(data)


class JsonCBV(View):
    def get(self, request, *args, **kwargs):
        data = {
            "data": "this is a class based view"
        }
        json_data = json.dumps(data)
        return HttpResponse(json_data, content_type="application/json")


class JsonCBV2(JsonResponseMixin, View):
    def get(self, request, *args, **kwargs):
        data = {
            "data": "this is a CBV with a mixin"
        }
        return self.render_to_json_response(data)


class SerializedDetailView(View):
    def get(self, request, *args, **kwargs):
        obj = Updates.objects.get(id=1)
        data = {
            "user": obj.user.username,
            "content": obj.content
        }
        json_data = json.dumps(data)
        return HttpResponse(json_data, content_type="application/json")


class SerializerListView(View):
    def get(self, request, *args, **kwargs):
        json_data = Updates.objects.all().serialize()
        return HttpResponse(json_data, content_type="application/json")


class SerializedDetailView2(View):
    def get(self, request, *args, **kwargs):
        obj = Updates.objects.get(id=1)
        json_data = obj.serialize()
        return HttpResponse(json_data, content_type="application/json")
