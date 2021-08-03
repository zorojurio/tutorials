from django.urls import path

from status.api.views import (
    StatusApiView, StatusApiDetailView

)

urlpatterns = [
    path('', StatusApiView.as_view(), name='status'),
    path('<id>/', StatusApiDetailView.as_view(), name='detail'),
]
