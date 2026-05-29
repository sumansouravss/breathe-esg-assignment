# 

## Overview

The system is designed to ingest emissions and activity data from multiple enterprise sources (SAP, Utility Portals, and Corporate Travel Platforms), normalize the data, identify suspicious records, and provide an auditable review workflow.

## Core Entities

### Company

Represents a client organization.

Fields:

* id
* name
* created_at

Purpose:
Supports multi-tenancy by allowing multiple companies to store independent emissions data.

---

### DataSource

Tracks the origin of uploaded data.

Fields:

* company
* source_type (SAP, UTILITY, TRAVEL, CUSTOM)
* file_name
* uploaded_by
* uploaded_at

Purpose:
Provides source-of-truth tracking and allows analysts to trace records back to their original upload.

---

### EmissionRecord

Stores normalized emissions activity data.

Fields:

* company
* source
* category
* scope
* activity_value
* unit
* normalized_value
* normalized_unit
* record_date
* is_suspicious
* risk_score
* analyst_note

Purpose:
Acts as the central emissions repository after ingestion and normalization.

---

### AuditLog

Tracks all actions performed on emission records.

Fields:

* emission_record
* action
* user
* notes
* timestamp

Purpose:
Maintains a complete audit trail for compliance and future auditing requirements.

## Scope Categorization

Scope 1:

* Fuel consumption
* SAP fuel exports

Scope 2:

* Purchased electricity
* Utility consumption

Scope 3:

* Business travel
* Flights
* Hotels
* Ground transportation

## Unit Normalization

The system stores both original and normalized values.

Examples:

* Liters → Liters
* kWh → kWh
* KM → KM

Future versions can support automatic unit conversion.

## Multi-Tenancy

Each Company owns:

* Data Sources
* Emission Records

This ensures complete separation of client data.

## Auditability

Every imported record generates an AuditLog entry.

Auditors can determine:

* Source file
* Upload date
* User
* Record history

This design prioritizes traceability, simplicity, and extensibility.
