import datetime

from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

expire_delta = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']


class UserPublicSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'url'
        ]

    def get_url(self, instance):
        return f"/api/users/{instance.id}"


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        data = super().get_token(user)
        data['name'] = user.username
        print(user)
        return data

    def validate(self, *args, **kwargs):
        data = super().validate(*args, **kwargs)
        data['name'] = self.user.username
        data['expires'] = timezone.now() + expire_delta - datetime.timedelta(seconds=200)
        return data

    def create(*args, **kwargs):
        return super().update(*args, **kwargs)

    def update(self, *args, **kwargs):
        return super().update(*args, **kwargs)
