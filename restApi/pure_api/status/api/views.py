import json

from rest_framework.generics import (
    ListAPIView, RetrieveAPIView
)
from rest_framework.mixins import (
    CreateModelMixin,
    UpdateModelMixin,
    DestroyModelMixin
)
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from accounts.api.permissions import IsOwnerOrReadOnly
from status.api.serializers import StatusSerializer
from status.models import Status


def is_json(json_data):
    try:
        real_json = json.loads(json_data)
        is_valid = True
    except ValueError:
        is_valid = False
    return is_valid


class StatusApiDetailView(UpdateModelMixin, DestroyModelMixin, RetrieveAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    serializer_class = StatusSerializer
    queryset = Status.objects.all()
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class StatusApiView(CreateModelMixin, ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = StatusSerializer
    passed_id = None
    search_fields = ['user__username', 'content']
    ordering_fields = ['user__username', 'timestamp', 'content']
    queryset = Status.objects.all()

    # def get_queryset(self):
    #     request = self.request
    #     print(request)
    #     qs = Status.objects.all()
    #     query = self.request.GET.get('q')
    #     if query is not None:
    #         qs = qs.filter(content__icontains=query)
    #     return qs

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
