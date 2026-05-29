from django.contrib import admin
from .models import EmissionRecord


@admin.register(EmissionRecord)
class EmissionRecordAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'company',
        'category',
        'scope',
        'activity_value',
        'unit',
        'status',
        'is_suspicious',
        'record_date',
    )

    list_filter = (
        'status',
        'is_suspicious',
        'scope',
    )

    search_fields = (
        'category',
    )