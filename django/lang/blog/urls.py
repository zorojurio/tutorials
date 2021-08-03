from django.urls import path, include
from parler_rest.fields import TranslatedFieldsField
from parler_rest.serializers import TranslatableModelSerializer
from rest_framework import routers, viewsets

from blog.mixins import TranslatedSerializerMixin
from blog.models import Post


class PostSerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    translations = TranslatedFieldsField(shared_model=Post)

    class Meta:
        model = Post
        fields = ('id', 'translations', 'author', 'created_on', 'updated_on')


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)

app_name = 'blog'
urlpatterns = [
    path('api/', include((router.urls, 'blog'))),
]
