from django.urls import path

from .views import (
    UploadSAPCSVView,
    UploadHistoryView,
    IngestionAnalyticsView,
)

urlpatterns = [

    path(
        "upload/",
        UploadSAPCSVView.as_view(),
        name="upload-csv"
    ),

    path(
        "history/",
        UploadHistoryView.as_view(),
        name="upload-history"
    ),

    path(
        "analytics/",
        IngestionAnalyticsView.as_view(),
        name="ingestion-analytics"
    ),

]