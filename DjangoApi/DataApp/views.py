from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from DataApp.models import Datas,Register
from DataApp.serializers import DatasSerializer
# Create your views here.

@csrf_exempt
def dataApi(request,id=0):
    if request.method=='GET':
        datas=Datas.objects.all()
        datas_serializer=DatasSerializer(datas,many=True)
        return JsonResponse(datas_serializer.data,safe=False)
    elif request.method=='POST':
        datas_data=JSONParser().parse(request)
        datas_serializer=DatasSerializer(data=datas_data)
        if datas_serializer.is_valid():
            datas_serializer.save()
            return JsonResponse('Added Successfully',safe=False)
        return JsonResponse('Failed to Add',safe=False)
    elif request.method=='PUT':
        datas_data=JSONParser().parse(request)
        datas=Datas.objects.get(id=datas_data["id"])
        datas_serializer=DatasSerializer(datas,data=datas_data)
        if datas_serializer.is_valid():
            datas_serializer.save()
            return JsonResponse('update successfully',safe=False)
        return JsonResponse('Failed to update')
    elif request.method=='DELETE':
        datas=Datas.objects.filter(id=id).first()
        datas.delete()
        return JsonResponse('Deleted Successfully',safe=False)
   

def dataApi1(request,id=0):
    if request.method=='GET':
        datas=Datas.objects.filter(id=id).first()
        datas_serializer=DatasSerializer(datas,many=False)
        return JsonResponse(datas_serializer.data,safe=False)

# def addUser(request,id=0):
#     request.method=='POST':
#         datas_data=JSONParser().parse(request)
#         datas_serializer=DatasSerializer(data=datas_data)
#         if datas_serializer.is_valid():
#             datas_serializer.save()
#             return JsonResponse('Added Successfully',safe=False)
#         return JsonResponse('Failed to Add',safe=False)