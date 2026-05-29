from django.db import models

from emissions.models import EmissionRecord


class AuditLog(models.Model):

    ACTION_CHOICES = [
        ('CREATED', 'CREATED'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
        ('UPDATED', 'UPDATED'),
    ]

    emission_record = models.ForeignKey(
        EmissionRecord,
        on_delete=models.CASCADE,
        related_name="audit_logs"
    )

    action = models.CharField(
        max_length=50,
        choices=ACTION_CHOICES
    )

    user = models.CharField(
        max_length=255
    )

    notes = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"{self.action} - "
            f"{self.emission_record.category}"
        )
        