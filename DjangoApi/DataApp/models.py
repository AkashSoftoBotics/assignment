from django.db import models

# Create your models here.
class Datas(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField( max_length=50)
    gender=models.CharField(max_length=50)
    email=models.EmailField( max_length=254)
    password=models.CharField(max_length=50)

class Register(models.Model):
    name=models.CharField( max_length=50)
    username=models.CharField(max_length=50,primary_key=True)
    password=models.CharField( max_length=50)