from django.urls import path
from updates.api.views import UpdateModelDetailApiView, UpdateModelListApiView

urlpatterns = [
    path('api-list/', UpdateModelListApiView.as_view()),
    path('api-detail/<int:id>/', UpdateModelDetailApiView.as_view()),
]
