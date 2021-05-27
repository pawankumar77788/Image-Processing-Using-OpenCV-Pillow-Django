from django.http import HttpResponse
from django.shortcuts import render, redirect
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