from marshmallow import Schema, fields, post_load
from datetime import datetime
import re

ISO8601_REGEX = re.compile(
    r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$"
)


class TaskModelSchema(Schema):
    _id = fields.String(dump_only=True)
    entity_name = fields.String(required=True)
    date = fields.String(required=True)  # Date input expected in ISO string format
    task_type = fields.String(required=True)
    phone_number = fields.String(required=True)
    contact_person = fields.String(required=True)
    notes = fields.String()
    status = fields.Integer(required=True)

    # Hook to process and convert the date to a Python datetime object

    @post_load
    def make_task(self, data, **kwargs):
        try:
            # Parse the ISO-formatted string into a datetime object
            data["date"] = datetime.fromisoformat(data["date"].replace("Z", "+00:00"))
        except ValueError:
            raise ValueError(
                "Invalid date format. Expected ISO 8601 format like '2023-12-16T00:00:00'"
            )
        return data
