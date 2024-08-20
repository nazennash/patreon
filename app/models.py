from django.db import models
from PIL import Image

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255, default="")
    stock = models.IntegerField(default=0)
    is_sold = models.BooleanField(default=False)
    favorite = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    # Starlink Standard Actuated Kit


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True, verbose_name='image', help_text='Image must be under 10MB', max_length=1000)

    def __str__(self):
        return f"Image for {self.product.name}"

    def save(self, *args, **kwargs):
        if self.image:
            sizes = [
                (100, 100),  # Small
                (400, 400),  # Medium
                (600, 600),  # Large
            ]
            for size in sizes:
                img = self.image.file
                img.seek(0)  
                image = Image.open(img)
                resized_image = image.resize(size, resample=Image.BICUBIC)
                resized_image_path = self.image.path.replace(self.image.name, f'{size[0]}x{size[1]}_{self.image.name}')
                resized_image.save(resized_image_path)

        super().save(*args, **kwargs)
