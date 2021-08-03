from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from accounts.api.users.serializers import UserDetailserializer
from status.api.serializers import StatusInlineSerializer
from status.models import Status

User = get_user_model()


class UserDetailAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserDetailserializer
    lookup_field = 'username'

    def get_serializer_context(self):
        return {
            'request': self.request
        }


# gives only all the status belongs to a user
class UserStatusAPIView(ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    serializer_class = StatusInlineSerializer

    def get_queryset(self, *args, **kwargs):
        username = self.kwargs.get('username', None)
        if username is None:
            return Status.objects.none()
        return Status.objects.filter(user__username=username)
