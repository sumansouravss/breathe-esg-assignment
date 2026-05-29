import pandas as pd

from django.db.models import Count

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from companies.models import Company
from ingestion.models import DataSource
from emissions.models import EmissionRecord
from audit.models import AuditLog

from .serializers import DataSourceSerializer


def detect_source(df):

    columns = [
        str(col).strip().lower()
        for col in df.columns
    ]

    # SAP

    if (
        "material description" in columns
        or "quantity" in columns
    ):
        return "SAP"

    # Utility

    elif (
        "kwh" in columns
        or "meter id" in columns
    ):
        return "UTILITY"

    # Travel

    elif (
        (
            "travel type" in columns
            and "distance km" in columns
        )
        or
        (
            "trip_type" in columns
            and "distance_km" in columns
        )
    ):
        return "TRAVEL"

    return "CUSTOM"


class UploadSAPCSVView(APIView):

    def post(self, request):

        file = request.FILES.get("file")

        if not file:
            return Response(
                {"error": "No file uploaded"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            df = pd.read_csv(file)

            print("FILE:", file.name)
            print("COLUMNS:", df.columns.tolist())

            source_detected = detect_source(df)

            company, _ = Company.objects.get_or_create(
                name="Demo Enterprise"
            )

            source = DataSource.objects.create(
                company=company,
                source_type=source_detected,
                file_name=file.name,
                uploaded_by="Analyst"
            )

            created_records = []
            failed_rows = []
            suspicious_count = 0

            for index, row in df.iterrows():

                try:

                    # ======================
                    # SAP
                    # ======================

                    if source_detected == "SAP":

                        category = row.get(
                            "Material Description"
                        )

                        activity_value = row.get(
                            "Quantity"
                        )

                        unit = row.get(
                            "Unit"
                        )

                        record_date = row.get(
                            "Posting Date"
                        )

                        scope = "Scope 1"

                    # ======================
                    # UTILITY
                    # ======================

                    elif source_detected == "UTILITY":

                        category = "Electricity"

                        activity_value = row.get(
                            "kWh"
                        )

                        unit = "kWh"

                        record_date = None

                        scope = "Scope 2"

                    # ======================
                    # TRAVEL
                    # ======================

                    elif source_detected == "TRAVEL":

                        category = (
                            row.get("Travel Type")
                            or row.get("trip_type")
                        )

                        activity_value = (
                            row.get("Distance KM")
                            or row.get("distance_km")
                        )

                        record_date = (
                            row.get("Booking Date")
                            or row.get("travel_date")
                        )

                        unit = "KM"

                        scope = "Scope 3"

                    # ======================
                    # CUSTOM CSV
                    # ======================

                    else:

                        category = row.get(
                            "category"
                        )

                        activity_value = row.get(
                            "activity_value"
                        )

                        unit = row.get(
                            "unit"
                        )

                        record_date = row.get(
                            "record_date"
                        )

                        scope = row.get(
                            "scope",
                            "Scope 1"
                        )

                    # ======================
                    # VALIDATION
                    # ======================

                    if pd.isna(category):

                        failed_rows.append({
                            "row": index + 1,
                            "error": "Missing category"
                        })

                        continue

                    if pd.isna(activity_value):

                        failed_rows.append({
                            "row": index + 1,
                            "error": "Missing activity value"
                        })

                        continue

                    activity_value = float(
                        activity_value
                    )

                    is_suspicious = False
                    risk_score = "LOW"
                    analyst_note = ""

                    if activity_value < 0:

                        is_suspicious = True

                        risk_score = "HIGH"

                        analyst_note = (
                            "Negative activity value detected"
                        )

                    elif activity_value == 0:

                        is_suspicious = True

                        risk_score = "MEDIUM"

                        analyst_note = (
                            "Zero consumption detected"
                        )

                    elif activity_value > 100000:

                        is_suspicious = True

                        risk_score = "MEDIUM"

                        analyst_note = (
                            "Unusually high consumption spike"
                        )

                    if is_suspicious:
                        suspicious_count += 1

                    if not record_date:
                        record_date = "2025-01-01"

                    record = EmissionRecord.objects.create(

                        company=company,

                        source=source,

                        category=category,

                        scope=scope,

                        activity_value=activity_value,

                        unit=unit,

                        normalized_value=activity_value,

                        normalized_unit=unit,

                        record_date=record_date,

                        is_suspicious=is_suspicious,

                        risk_score=risk_score,

                        analyst_note=analyst_note

                    )

                    created_records.append(
                        record.id
                    )

                    AuditLog.objects.create(

                        emission_record=record,

                        action="CREATED",

                        user="System",

                        notes=(
                            f"Record ingested from "
                            f"{source_detected}"
                        )

                    )

                except Exception as e:

                    failed_rows.append({
                        "row": index + 1,
                        "error": str(e)
                    })

            return Response({

                "message":
                "CSV uploaded successfully",

                "source_detected":
                source_detected,

                "records_created":
                len(created_records),

                "failed_rows":
                failed_rows,

                "suspicious_records":
                suspicious_count

            })

        except Exception as e:

            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class UploadHistoryView(APIView):

    def get(self, request):

        uploads = DataSource.objects.all().order_by(
            "-uploaded_at"
        )

        serializer = DataSourceSerializer(
            uploads,
            many=True
        )

        return Response(
            serializer.data
        )


class IngestionAnalyticsView(APIView):

    def get(self, request):

        total_uploads = DataSource.objects.count()

        total_records = EmissionRecord.objects.count()

        suspicious_records = (
            EmissionRecord.objects
            .filter(
                is_suspicious=True
            )
            .count()
        )

        suspicious_percentage = 0

        if total_records > 0:

            suspicious_percentage = round(

                (
                    suspicious_records
                    / total_records
                ) * 100,

                2

            )

        source_breakdown = list(

            DataSource.objects
            .values("source_type")
            .annotate(
                count=Count("id")
            )

        )

        return Response({

            "total_uploads":
            total_uploads,

            "total_records":
            total_records,

            "suspicious_records":
            suspicious_records,

            "suspicious_percentage":
            suspicious_percentage,

            "source_breakdown":
            source_breakdown

        })