from django.urls import re_path as url
from DataApp import views

urlpatterns=[
    url(r'^data$',views.dataApi),
    url(r'^data/([0-9]+)$',views.dataApi),
    url(r'^getdata/([0-9]+)$',views.dataApi1),
]