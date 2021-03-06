from django.http import HttpResponse
from django.core import serializers
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import *
import urllib.request
import requests
import json
import cv2
import time
# from cv2 import dnn_superres
from .forms import *
  
# Create your views here.
def low_resolution_submit(request):
  
    if request.method == 'POST':
        form = lowresolutionForm(request.POST, request.FILES)
  
        if form.is_valid():
            form.save()
            return HttpResponse('successfully uploaded')
    else:
        form = lowresolutionForm()
    return render(request, 'index.html', {'form' : form})

def cropped_image(request):
    if request.is_ajax() and request.method == "POST":
        data_cordinates = json.loads(request.POST.get('data', ''))
        resolution = json.loads(request.POST.get('resolution',''))
        data = request.FILES.get('image')
        form = originalresolution(original_resolution_Img = data)
        form.save()
        image = cv2.imread(originalresolution.objects.latest('original_resolution_Img').original_resolution_Img.path)
        cropped_image = image[int(data_cordinates['x']):int(data_cordinates['x'])+resolution['height'], int(data_cordinates['y']):int(data_cordinates['y'])+resolution['width']]
        cv2.imwrite("./media/images/lowresolution/cropped.jpg",cropped_image)
        form1 = lowresolution(low_resolution_Img = 'images/lowresolution/cropped.jpg')
        form1.save()
        lowresolution_img = cv2.imread(lowresolution.objects.latest('low_resolution_Img').low_resolution_Img.path)
        start_time = time.time()
        r = requests.post(
            "https://api.deepai.org/api/torch-srgan",
            files={
                'image': open("./media/images/lowresolution/cropped.jpg", 'rb'),
            },
            headers={'api-key': '05e3672f-71f5-412c-a0c4-75bcd67f075a'}
        )
        # path = "./models/EDSR_x4.pb"
        # Create an SR object
        # sr = dnn_superres.DnnSuperResImpl_create()
        # sr.readModel(path)
        # sr.setModel("edsr", 4)
        # start_time = time.time()
        # superresolution_img = sr.upsample(lowresolution_img)
        # cv2.imwrite("./media/images/superresolution/upscaled.jpg", superresolution_img)
        urllib.request.urlretrieve(r.json()['output_url'], "./media/images/superresolution/upscaled.jpg")
        end_time = time.time()
        time_taken = end_time - start_time
        form2 = superresolution(super_resolution_Img = 'images/superresolution/upscaled.jpg')
        form2.save()
        instance = serializers.serialize('json', superresolution.objects.all(),fields=('super_resolution_Img'))
        originalresolution.objects.all().delete()
        lowresolution.objects.all().delete()
        superresolution.objects.all().delete()
        # print(data_cordinates)
        # print(request.POST.get('cordinates_x'),request.POST.get('cordinates_y'))
        # print(int(data_cordinates['x']),int(data_cordinates['y']))
        # print(cropped_image.shape)
        return JsonResponse({"time_taken":time_taken,"instance": instance})