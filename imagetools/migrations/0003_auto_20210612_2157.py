# Generated by Django 3.1.1 on 2021-06-12 16:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('imagetools', '0002_originalresolution_superresolution'),
    ]

    operations = [
        migrations.RenameField(
            model_name='originalresolution',
            old_name='orignial_resolution_Img',
            new_name='original_resolution_Img',
        ),
    ]
