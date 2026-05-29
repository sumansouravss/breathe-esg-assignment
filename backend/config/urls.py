from django.contrib import admin
from django.urls import path, include

urlpatterns = [

    path(
        'admin/',
        admin.site.urls
    ),

    path(
        'emissions/',
        include('emissions.urls')
    ),

    path(
        'ingestion/',
        include('ingestion.urls')
    ),

    path(
    "audit/",
    include("audit.urls")
    ),

]