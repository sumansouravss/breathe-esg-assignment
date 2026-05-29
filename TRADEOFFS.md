# 

## 1. No Real SAP Integration

Not Implemented:

* SAP OData
* BAPI
* IDoc integrations

Reason:
Would require enterprise SAP access and significantly increase development time.

Tradeoff:
CSV exports provide a realistic prototype while keeping implementation manageable.

---

## 2. No PDF Utility Parsing

Not Implemented:
Automatic extraction from electricity bills.

Reason:
PDF parsing introduces OCR complexity and utility-specific layouts.

Tradeoff:
CSV exports are easier to validate and normalize.

---

## 3. No Authentication System

Not Implemented:

* Login
* Roles
* Permissions

Reason:
Assignment focus is ingestion and emissions workflow.

Tradeoff:
Allowed more development effort on ingestion quality and audit tracking.

---

## Future Enhancements

* User authentication
* Approval workflows
* PDF extraction
* Real SAP connectors
* Automated emissions factor calculations
* Advanced anomaly detection
