from rest_framework import serializers
from .models import Product, ProductImage, Category, CategoryImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

class CategoryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryImage
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    images = CategoryImageSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = '__all__'