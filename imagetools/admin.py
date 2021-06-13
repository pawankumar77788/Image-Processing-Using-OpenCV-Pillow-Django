from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import *

admin.site.register(lowresolution)
admin.site.register(originalresolution)
admin.site.register(superresolution)