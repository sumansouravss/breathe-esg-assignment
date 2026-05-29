from django.contrib import admin  # type: ignore[import]

from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "emission_record",
        "action",
        "user",
        "created_at",
    )

    search_fields = (
        "action",
        "user",
    )

    list_filter = (
        "action",
        "created_at",
    )