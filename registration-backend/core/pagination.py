from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    """Page number pagination that allows clients to control the page size."""

    page_size_query_param = "page_size"
    max_page_size = 500
