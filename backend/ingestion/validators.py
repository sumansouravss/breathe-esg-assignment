def validate_record(row):

    errors = []

    # REQUIRED FIELDS

    required_fields = [
        "category",
        "scope",
        "activity_value",
        "unit",
        "record_date",
    ]

    for field in required_fields:

        if not row.get(field):

            errors.append(f"{field} is required")

    # NEGATIVE VALUES

    try:

        value = float(row.get("activity_value", 0))

        if value < 0:

            errors.append(
                "Negative activity value"
            )

    except:

        errors.append(
            "Invalid activity value"
        )

    return errors