from django.db import models  # type: ignore[import]
from companies.models import Company
from ingestion.models import DataSource


class EmissionRecord(models.Model):

    STATUS_CHOICES = [
        ("PENDING", "PENDING"),
        ("APPROVED", "APPROVED"),
        ("REJECTED", "REJECTED"),
    ]

    RISK_CHOICES = [
        ("HIGH", "HIGH"),
        ("MEDIUM", "MEDIUM"),
        ("LOW", "LOW"),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="emission_records"
    )

    source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE,
        related_name="emission_records"
    )

    category = models.CharField(
        max_length=255
    )

    scope = models.CharField(
        max_length=50
    )

    activity_value = models.FloatField()

    unit = models.CharField(
        max_length=50
    )

    normalized_value = models.FloatField()

    normalized_unit = models.CharField(
        max_length=50
    )

    record_date = models.DateField()

    is_suspicious = models.BooleanField(
        default=False
    )

    risk_score = models.CharField(
        max_length=20,
        choices=RISK_CHOICES,
        default="LOW"
    )

    analyst_note = models.TextField(
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return (
            f"{self.category} | "
            f"{self.company.name} | "
            f"{self.status}"
        )