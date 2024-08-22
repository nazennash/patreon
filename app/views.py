from django.shortcuts import render
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from django.db.models import Q
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product  


# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(category__icontains=search)  
            )
        return queryset

    @action(detail=False, methods=['get'])
    def category(self, request):
        category_name = request.query_params.get('category')
        
        if category_name is not None:
            products = self.queryset.filter(category__icontains=category_name)
            serializer = self.get_serializer(products, many=True)
            return Response(serializer.data)
        else:
            categories = self.queryset.values_list('category', flat=True).distinct()
            return Response({"categories": categories})
        