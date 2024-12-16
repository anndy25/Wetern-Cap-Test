from flask import request, jsonify
import inflection


class MiddlewareManager:
    """
    Handles request payload transformation (camelCase to snake_case) and
    response payload transformation (snake_case to camelCase).
    """

    @staticmethod
    def process_request():
        """
        Converts camelCase JSON keys into snake_case for incoming requests.
        """
        request.body = {}
        request.query_params = {}
        if request.is_json:
            try:
                request_data = request.get_json()
                converted_payload = MiddlewareManager.convert_keys_to_snake_case(
                    request_data
                )
                request.body = converted_payload
            except Exception as e:
                print("Error processing request payload:", e)

        # Convert query parameters
        if request.args:
            try:
                converted_args = MiddlewareManager.convert_keys_to_snake_case(
                    dict(request.args)
                )
                request.query_params = converted_args
                print("Converted Query Parameters:", converted_args)
            except Exception as e:
                print("Error processing query parameters:", e)

        # Convert path parameters
        if request.view_args:
            try:
                converted_view_args = MiddlewareManager.convert_keys_to_snake_case(
                    request.view_args
                )
                request.path_params = converted_view_args
                print("Converted Path Parameters:", converted_view_args)
            except Exception as e:
                print("Error processing path parameters:", e)

    @staticmethod
    def process_response(response):
        """
        Converts snake_case JSON keys into camelCase for outgoing responses.
        """
        try:
            if response.is_json:
                response_data = response.get_json()
                converted_response = MiddlewareManager.convert_keys_to_camel_case(
                    response_data
                )
                response.set_data(jsonify(converted_response).data)
        except Exception as e:
            print("Error processing response payload:", e)

        return response

    @staticmethod
    def convert_keys_to_snake_case(data):
        """
        Recursively converts dictionary or list keys from camelCase to snake_case.
        """
        if isinstance(data, list):
            return [
                MiddlewareManager.convert_keys_to_snake_case(item)
                if isinstance(item, dict)
                else item
                for item in data
            ]
        if isinstance(data, dict):
            return {
                inflection.underscore(k): MiddlewareManager.convert_keys_to_snake_case(
                    v
                )
                for k, v in data.items()
            }
        return data

    @staticmethod
    def snake_to_camel_case(string):
        """
        Convert snake_case string to camelCase.
        """
        parts = string.split("_")
        return parts[0] + "".join(word.capitalize() for word in parts[1:])

    @staticmethod
    def convert_keys_to_camel_case(data):
        """
        Recursively converts dictionary or list keys from snake_case to camelCase.
        """
        if isinstance(data, list):
            return [
                MiddlewareManager.convert_keys_to_camel_case(item)
                if isinstance(item, dict)
                else item
                for item in data
            ]
        if isinstance(data, dict):
            return {
                MiddlewareManager.snake_to_camel_case(
                    k
                ): MiddlewareManager.convert_keys_to_camel_case(v)
                for k, v in data.items()
            }
        return data
