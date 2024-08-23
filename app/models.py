from django.db import models
from PIL import Image

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class CategoryImage(models.Model):
    category = models.ForeignKey(Category, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='category_images/', blank=True, null=True, verbose_name='image', help_text='Image must be under 10MB', max_length=1000)

    def __str__(self):
        return f"Image for {self.category.name}"


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    stock = models.IntegerField(default=0)
    favorite = models.IntegerField(default=0)
    color = models.CharField(max_length=255, blank=True, null=True)
    is_sold = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name



class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True, verbose_name='image', help_text='Image must be under 10MB', max_length=1000)

    def __str__(self):
        return f"Image for {self.product.name}"
