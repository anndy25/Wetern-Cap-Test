from db import db
from bson.objectid import ObjectId
from http import HTTPStatus
from marshmallow.exceptions import ValidationError
import schema.task_schema as TaskSchema

task_schema = TaskSchema.TaskModelSchema()


# Create a new sales task
def create_task(task):
    try:
        # Validate the request
        validated_data = task_schema.load(task)
        db["sales-log"].insert_one(validated_data)
        return {"message": "Task created successfully"}
    except ValidationError as err:
        return {"error": err.messages}
    except Exception as e:
        return {"error": str(e)}


def update_task(task_id, task):
    try:
        validated_data = task_schema.load(task)
        if not task_id:
            return {"error": "Task ID is required for update"}

        result = db["sales-log"].update_one(
            {"_id": ObjectId(task_id)},
            {"$set": validated_data},
        )
        # If no document was found to update
        if result.matched_count == 0:
            return {"error": "No task found with the provided ID"}

        return {"message": "Task updated successfully"}

    except ValidationError as err:
        return {"error": err.messages}
    except Exception as e:
        return {"error": str(e)}


def update_task_status(task_id, status):
    try:
        result = db["sales-log"].update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"status": status}},
        )
        # If no document was found to update
        if result.matched_count == 0:
            return {"error": "No task found with the provided ID"}

        return {"message": "Task status updated successfully"}

    except Exception as e:
        return {"error": str(e)}


def delete_task_status(task_id):
    try:
        result = db["sales-log"].delete_one({"_id": ObjectId(task_id)})
        if result.deleted_count == 0:
            return {"error": "No task found with the provided ID"}

        return {"message": "Task deleted successfully"}, HTTPStatus.NO_CONTENT

    except Exception as e:
        return {"error": str(e)}, HTTPStatus.INTERNAL_SERVER_ERROR
