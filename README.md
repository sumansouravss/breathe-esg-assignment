# Breathe ESG Tech Intern Assignment

## Overview

This project is a prototype ESG emissions ingestion platform built using Django REST Framework and React.

The system ingests emissions-related activity data from:

* SAP exports
* Utility electricity reports
* Corporate travel platforms

The data is normalized, validated, flagged for suspicious values, and stored with a complete audit trail.

---

## Features

### Data Ingestion

Supports:

* SAP CSV uploads
* Utility CSV uploads
* Travel CSV uploads

Automatic source detection is performed during upload.

---

### Validation

Detects:

* Missing values
* Negative values
* Zero values
* Unusually large activity values

---

### Audit Trail

Every imported record generates an audit log entry.

---

### Analytics Dashboard

Displays:

* Total uploads
* Total records
* Suspicious records
* Source breakdown

---

## Technology Stack

Backend:

* Django
* Django REST Framework
* PostgreSQL

Frontend:

* React
* TypeScript

Deployment:

* Render

---

## API Endpoints

### Upload CSV

POST

```bash
/ingestion/upload/
```

### Upload History

GET

```bash
/ingestion/history/
```

### Analytics

GET

```bash
/ingestion/analytics/
```

---

## Deployment

Backend URL:
https://breathe-esg-assignment-wy3b.onrender.com


---
Frontend URL:
https://breathe-esg-assignment-eight-kappa.vercel.app/



## Repository

GitHub:

https://github.com/sumansouravss/breathe-esg-assignment

---

## Future Improvements

* PDF utility parsing
* Real SAP integration
* Authentication
* Approval workflow
* Emission factor calculations

---

## Author

Suman Sourav

