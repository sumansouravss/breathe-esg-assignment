from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from emissions.models import EmissionRecord
from emissions.serializers import EmissionRecordSerializer

from audit.models import AuditLog


class EmissionRecordListView(APIView):

    def get(self, request):

        records = EmissionRecord.objects.all().order_by(
            '-created_at'
        )

        serializer = EmissionRecordSerializer(
            records,
            many=True
        )

        return Response(serializer.data)


class SuspiciousRecordsView(APIView):

    def get(self, request):

        records = EmissionRecord.objects.filter(
            is_suspicious=True
        ).order_by('-created_at')

        serializer = EmissionRecordSerializer(
            records,
            many=True
        )

        return Response(serializer.data)


class ApproveRecordView(APIView):

    def post(self, request, record_id):

        try:

            record = EmissionRecord.objects.get(
                id=record_id
            )

            record.status = 'APPROVED'

            record.save()

            # CREATE AUDIT LOG

            AuditLog.objects.create(

                emission_record=record,

                action='APPROVED',

                user='Analyst',

                notes='Record approved by analyst'

            )

            return Response({

                "message":
                "Record approved successfully"

            })

        except EmissionRecord.DoesNotExist:

            return Response(

                {"error": "Record not found"},

                status=status.HTTP_404_NOT_FOUND

            )


class RejectRecordView(APIView):

    def post(self, request, record_id):

        try:

            record = EmissionRecord.objects.get(
                id=record_id
            )

            record.status = 'REJECTED'

            record.save()

            # CREATE AUDIT LOG

            AuditLog.objects.create(

                emission_record=record,

                action='REJECTED',

                user='Analyst',

                notes='Record rejected by analyst'

            )

            return Response({

                "message":
                "Record rejected successfully"

            })

        except EmissionRecord.DoesNotExist:

            return Response(

                {"error": "Record not found"},

                status=status.HTTP_404_NOT_FOUND

            )