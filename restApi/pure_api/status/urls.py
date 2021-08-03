from django.urls import path, include

app_name = "api-status"
urlpatterns = [
    path('api/', include('status.api.urls'))
]
