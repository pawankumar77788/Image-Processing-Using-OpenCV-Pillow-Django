from django.db import models
from .storage import OverwriteStorage

# Create your models here.
class lowresolution(models.Model):
    low_resolution_Img = models.ImageField(upload_to='images/lowresolution/')

class originalresolution(models.Model):
    original_resolution_Img = models.ImageField(upload_to='images/originalresolution/',storage=OverwriteStorage())

class superresolution(models.Model):
    super_resolution_Img = models.ImageField(upload_to='images/superresolution')