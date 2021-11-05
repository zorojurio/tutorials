from django.urls import path

from search.views import ProductView, ProductBackendApiView

# api/
app_name = 'products'
urlpatterns = [
    path('products/frontend', ProductView.as_view(), name='frontend-api'),
    path('products/backend', ProductBackendApiView.as_view(), name='backend-api'),
]
