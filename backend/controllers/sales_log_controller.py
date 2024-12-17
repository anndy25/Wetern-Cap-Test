from app import app
from flask import request, jsonify
from http import HTTPStatus


try:
    import services.sales_log as sales_log_service
    import services.fetch_sales_log as fetch_sales_log_service

    print("Services imported successfully.")
except Exception as e:
    print("Error during services import: BHi something wrong", e)
    sales_log_service = None
    fetch_sales_log_service = None


@app.route("/sales-log", methods=["POST"])
def get_sales_log():
    try:
        result = fetch_sales_log_service.get_sales_logs(
            request.body, request.query_params
        )
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route("/sales-log/filters", methods=["GET"])
def get_sales_filters():
    try:
        response = fetch_sales_log_service.get_sales_filters()
        return jsonify(response), HTTPStatus.OK
    except Exception as e:
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route("/sales-log/create-task", methods=["POST"])
def create_task():
    try:
        response = sales_log_service.create_task(request.body)
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/sales-log/update-task/<task_id>", methods=["PUT"])
def update_task(task_id):
    try:
        response = sales_log_service.update_task(task_id, request.body)
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route("/sales-log/status/<task_id>", methods=["PATCH"])
def update_task_status(task_id):
    try:
        response = sales_log_service.update_task_status(
            task_id, request.get_json().get("status")
        )
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route("/sales-log/delete-task/<task_id>", methods=["DELETE"])
def delete_task_status(task_id):
    try:
        response = sales_log_service.delete_task_status(task_id)
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
