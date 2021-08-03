from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.reverse import reverse as api_reverse
from status.api.serializers import StatusInlineSerializer

User = get_user_model()


class UserDetailserializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    status = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'url',
            'status',
        ]

    def get_url(self, instance):
        request = self.context.get('request')
        return api_reverse('api-users:detail', kwargs={
            'username': instance.username
        }, request=request)
    # in here request must be passed as an argumaent otherwise full URL
    # will not be loaded, only a short one will be loaded

    def get_status(self, instance):
        request = self.context.get('request')
        limit = 10
        if request:
            limit_query = request.GET.get('limit')
            try:
                limit = int(limit_query)
            except:
                pass
        qs = instance.status_set.all().order_by('-timestamp')
        data = {
            'status_uri': self.get_url(instance) + "status/",
            'last': StatusInlineSerializer(
                qs.first(),
                context={'request': request}
            ).data,
            'recent_status': StatusInlineSerializer(
                qs[:limit],
                many=True,
                context={'request': request}
            ).data
        }
        return data
