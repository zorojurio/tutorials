from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination


class CustomPagination(PageNumberPagination):
    page_size = 10


class CustomLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 2
    max_limit = 5
    limit_query_param = 'lim'

