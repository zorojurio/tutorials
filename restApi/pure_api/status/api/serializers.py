from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.reverse import reverse as api_reverse

from accounts.api.serializers import UserPublicSerializer
from status.models import Status

User = get_user_model()


class StatusInlineSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Status
        fields = [
            'id',
            'content',
            'image',
            'url'
        ]

    def get_url(self, instance):
        request = self.context.get('request')
        return api_reverse('api-status:detail', kwargs={
            'id': instance.id
        }, request=request)

    def validate(self, data):
        content = data.get('content')
        if content == "":
            content = None
        if content is None:
            raise serializers.ValidationError('Content is required')
        return data


class StatusSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    uri = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Status
        fields = [
            'id',
            'user',
            'uri',
            'content',
            'image'
        ]
        read_only_fields = ['user']

    def get_uri(self, instance):
        request = self.context.get('request')
        return api_reverse('api-status:detail', kwargs={
            'id': instance.id
        }, request=request)

    def validate(self, data):
        content = data.get('content')
        if content == "":
            content = None
        if content is None:
            raise serializers.ValidationError('Content is required')
        return data
