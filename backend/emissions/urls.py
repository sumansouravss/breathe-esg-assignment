from django.urls import path

from .views import (
    EmissionRecordListView,
    SuspiciousRecordsView,
    ApproveRecordView,
    RejectRecordView,
)

urlpatterns = [

    path(
        'records/',
        EmissionRecordListView.as_view(),
        name='records'
    ),

    path(
        'suspicious/',
        SuspiciousRecordsView.as_view(),
        name='suspicious-records'
    ),

    path(
        'approve/<int:record_id>/',
        ApproveRecordView.as_view(),
        name='approve-record'
    ),

    path(
        'reject/<int:record_id>/',
        RejectRecordView.as_view(),
        name='reject-record'
    ),

]