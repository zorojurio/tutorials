from django.urls import path, include

from updates.views import (
    detail_view,
    new_json,
    SerializerListView,
    SerializedDetailView2
)

app_name = "updates"
urlpatterns = [
    path('', detail_view),
    path('new/', new_json),
    path('serial/', SerializerListView.as_view()),
    path('detail/', SerializedDetailView2.as_view()),
    path('api/', include('updates.api.urls'))
]
