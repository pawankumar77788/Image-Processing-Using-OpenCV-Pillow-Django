from django.db import models

# Create your models here.
class lowresolution(models.Model):
    low_resolution_Img = models.ImageField(upload_to='images/lowresolution/')