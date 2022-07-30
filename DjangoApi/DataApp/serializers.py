from rest_framework import serializers
from DataApp.models import Datas,Register

class DatasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Datas
        fields=('id',
        'name',
        'gender',
        'email',
        'password')

# class RegisterSerializer(serializers.ModekSerializer):
#     class Meta:
#         model=Register
#         fields=('name',
#         'username',
#         'password')