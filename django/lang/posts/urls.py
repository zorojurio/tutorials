from django.urls import path

from posts.views import home, item

app_name = 'posts'
urlpatterns = [
    path('', home, name='home'),
    path('item/', item, name='item')
]
