from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from django.db.models import Q
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from rest_framework.pagination import PageNumberPagination
import random

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = CustomPageNumberPagination  

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.query_params.get('search', None)
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        color = self.request.query_params.get('color', None)
        category_name = self.request.query_params.get('category', None)

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search)
            )

        if category_name:
            queryset = queryset.filter(category__name__icontains=category_name)

        if min_price and max_price:
            queryset = queryset.filter(price__gte=min_price, price__lte=max_price)
        elif min_price:
            queryset = queryset.filter(price__gte=min_price)
        elif max_price:
            queryset = queryset.filter(price__lte=max_price)

        if color:
            queryset = queryset.filter(color__icontains=color)

        return queryset.order_by('?')

    @action(detail=False, methods=['get'])
    def new_arrivals(self, request):
        now = timezone.now()
        time_ago = now - timezone.timedelta(days=1)
        # time_ago = now - timezone.timedelta(hours=4)
        products = self.queryset.filter(date_created__gte=time_ago)
        
        products_list = list(products)
        random.shuffle(products_list)
        
        paginator = self.pagination_class()
        paginated_products = paginator.paginate_queryset(products_list, request)
        serializer = self.get_serializer(paginated_products, many=True)
        return paginator.get_paginated_response(serializer.data)

    @action(detail=False, methods=['get'], url_path='category/(?P<category_name>[^/.]+)')
    def products_by_category(self, request, category_name=None):
        products = self.queryset.filter(category__name=category_name)
        
        paginator = self.pagination_class()
        paginated_products = paginator.paginate_queryset(products, request)
        
        serializer = self.get_serializer(paginated_products, many=True)
        
        return paginator.get_paginated_response(serializer.data)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = CustomPageNumberPagination  

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = self.get_serializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)
