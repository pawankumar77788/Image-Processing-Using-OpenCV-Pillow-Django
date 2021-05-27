from django import forms
from .models import *
  
class lowresolutionForm(forms.ModelForm):
  
    class Meta:
        model = lowresolution
        fields = ['low_resolution_Img']