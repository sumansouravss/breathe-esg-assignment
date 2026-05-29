# 

## 1. Ingestion Method

Decision:
CSV file upload was selected for all three sources.

Reason:
CSV exports are commonly available across SAP systems, utility portals, and travel management platforms.

Alternative Considered:
Direct API integration.

Why Not:
Would require external credentials and significantly increase implementation complexity.

---

## 2. SAP Data Handling

Decision:
Handle flat-file CSV exports.

Reason:
SAP exports frequently appear as CSV or spreadsheet extracts for reporting.

Supported Fields:

* Material Description
* Quantity
* Unit
* Posting Date

Ignored:

* IDoc
* BAPI
* OData integrations

---

## 3. Utility Data Handling

Decision:
Handle utility portal CSV exports.

Reason:
Most facilities teams export electricity consumption reports as CSV files.

Supported Fields:

* kWh
* Meter ID
* Billing Period

Ignored:

* PDF bill parsing
* Utility-specific APIs

---

## 4. Travel Data Handling

Decision:
Handle CSV exports inspired by Concur/Navan reports.

Supported Fields:

* Travel Type
* Distance KM
* Booking Date

Reason:
Provides a realistic representation of travel activity data.

---

## 5. Suspicious Record Detection

Decision:
Automatically flag:

* Negative values
* Zero values
* Extremely large values

Reason:
These patterns often indicate data quality issues requiring analyst review.

---

## Questions for PM

1. Should records require analyst approval before becoming visible?
2. Which unit conversion standards should be enforced?
3. Should utility PDF ingestion be supported?
4. Should emission factor calculations be included?
5. What retention period is required for audit logs?
