from django.urls import path
from accounts.api.users.views import UserDetailAPIView, UserStatusAPIView

app_name = 'api-users'
urlpatterns = [
    path('<username>/', UserDetailAPIView.as_view(), name='detail'),
    path('<username>/status/', UserStatusAPIView.as_view(), name='status-list'),
]
