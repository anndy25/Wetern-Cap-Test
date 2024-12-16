from db import db
from pymongo.errors import PyMongoError


def get_sales_filters():
    try:
        # MongoDB aggregation pipeline
        pipeline = [
            {
                "$group": {
                    "_id": None,
                    "unique_entity_names": {"$addToSet": "$entity_name"},
                    "unique_contact_persons": {"$addToSet": "$contact_person"},
                    "unique_task_types": {"$addToSet": "$task_type"},
                    "unique_statuses": {"$addToSet": "$status"},
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "entity_name": {
                        "$map": {
                            "input": "$unique_entity_names",
                            "as": "item",
                            "in": {"label": "$$item", "value": "$$item"},
                        }
                    },
                    "contact_person": {
                        "$map": {
                            "input": "$unique_contact_persons",
                            "as": "item",
                            "in": {"label": "$$item", "value": "$$item"},
                        }
                    },
                    "task_type": {
                        "$map": {
                            "input": "$unique_task_types",
                            "as": "item",
                            "in": {"label": "$$item", "value": "$$item"},
                        }
                    },
                    "status": {
                        "$map": {
                            "input": "$unique_statuses",
                            "as": "item",
                            "in": {"label": "$$item", "value": "$$item"},
                        }
                    },
                }
            },
        ]

        # Execute the aggregation query
        aggregation_result = list(db["sales-log"].aggregate(pipeline))

        # Handle edge cases
        if aggregation_result:
            return aggregation_result[0]
        else:
            return {"entity_name": [], "contact_person": []}

    except Exception as e:
        print(f"Error during aggregation: {e}")
        return {"entity_name": [], "contact_person": []}


def get_sales_logs(filters, query_params):
    try:
        # Extract filters and sorting details
        print(filters)
        print(query_params)
        sort_by = query_params.get("sort_by", "date")
        sorting_order = (
            1 if query_params.get("sorting_order", 0) == 0 else -1
        )  # Ascending = 0, Descending = 1
        search_text = query_params.get("search", "").strip()
        match_conditions = {}
        group_by_logic = {
            "date": {
                "$dateFromString": {
                    "dateString": {
                        "$dateToString": {
                            "format": "%Y-%m-%dT00:00:00.000Z",
                            "date": "$date",
                        },
                    },
                },
            },
            "status": "$status",
            "task_type": "$task_type",
            "entity_name": "$entity_name",
            "contact_person": "$contact_person",
        }

        # Dynamically choose groupBy logic based on sort_by
        group_by_key = group_by_logic.get(sort_by, "$date")

        # Apply search logic if a search text is provided
        if search_text:
            match_conditions["$or"] = [
                {"entity_name": {"$regex": search_text, "$options": "i"}},
                {"contact_person": {"$regex": search_text, "$options": "i"}},
                {"task_type": {"$regex": search_text, "$options": "i"}},
            ]
        if "entity_name" in filters:
            match_conditions["entity_name"] = {
                "$in": [f["value"] for f in filters.get("entity_name", [])]
            }
        if "task_type" in filters:
            match_conditions["task_type"] = {
                "$in": [f["value"] for f in filters.get("task_type", [])]
            }
        if "contact_person" in filters:
            match_conditions["contact_person"] = {
                "$in": [f["value"] for f in filters.get("contact_person", [])]
            }
        if "status" in filters:
            match_conditions["status"] = {
                "$in": [f["value"] for f in filters.get("status", [])]
            }
        if "date" in filters:
            date_filter = filters.get("date", {})
            if "start_at" in date_filter and "end_at" in date_filter:
                match_conditions["date"] = {
                    "$gte": date_filter["start_at"],
                    "$lte": date_filter["end_at"],
                }

        # MongoDB aggregation pipeline with data transformation
        pipeline = [
            {"$match": match_conditions},  # Initial matching
            {
                "$group": {
                    "_id": group_by_key,
                    "open_count": {"$sum": {"$cond": [{"$eq": ["$status", 1]}, 1, 0]}},
                    "list": {
                        "$push": "$$ROOT"  # Push entire documents into the list for grouping
                    },
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "entity": "$_id",  # Convert group id to string
                    "open_count": 1,
                    "list": {
                        "$sortArray": {  # Sort the array by date if MongoDB supports it
                            "input": "$list",
                            "sortBy": {"date": sorting_order},
                        }
                    },
                }
            },
            {
                "$project": {
                    "entity": 1,
                    "open_count": 1,
                    "list": {
                        "$map": {
                            "input": "$list",
                            "as": "item",
                            "in": {
                                "id": {"$toString": "$$item._id"},
                                "status": "$$item.status",
                                "date": "$$item.date",
                                "entity_name": "$$item.entity_name",
                                "contact_person": "$$item.contact_person",
                                "task_type": "$$item.task_type",
                                "notes": "$$item.notes",
                                "phone_number": "$$item.phone_number",
                            },
                        }
                    },
                }
            },
            {"$sort": {"entity": sorting_order}},  # Final sort by the grouped label
        ]

        try:
            result = list(db["sales-log"].aggregate(pipeline))
            return result
        except PyMongoError as mongo_error:
            return {"error": f"Database error: {str(mongo_error)}"}

    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}
