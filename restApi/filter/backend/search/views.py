import math

from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from search.models import Product
from search.serializers import ProductSerializer


class ProductView(APIView):
    def get(self, request):
        products_qs = Product.objects.all()
        serializer = ProductSerializer(products_qs, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class ProductBackendApiView(APIView):
    def get(self, request):
        print(request)
        query = request.GET.get('q')
        sort = request.GET.get('sort')
        page = int(request.GET.get('page', 1))
        per_page = 9
        products_qs = Product.objects.all()

        if query:
            products_qs = products_qs.filter(
                Q(title__icontains=query),
                Q(description__contains=query)
            )
        total_products = products_qs.count()
        if sort == 'acs':
            products_qs = products_qs.order_by('price')
        elif sort == 'desc':
            products_qs = products_qs.order_by('-price')

        start = (page - 1) * per_page
        end = page * per_page
        serializer = ProductSerializer(products_qs[start:end], many=True)
        data = {
            'data': serializer.data,
            'total': total_products,
            'page': page,
            'last_page': math.ceil(total_products/per_page)
        }
        return Response(data=data, status=status.HTTP_200_OK)
