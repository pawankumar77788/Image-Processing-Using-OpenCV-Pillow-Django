from django.contrib import admin  
from django.urls import path  
from . import views  
from django.conf import settings
from django.conf.urls.static import static
  
urlpatterns = [    
    path('index/', views.low_resolution_submit),
] 

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)

