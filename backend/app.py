from flask import Flask
from dotenv import load_dotenv
from middleware.conversion_middleware import MiddlewareManager
from flask_cors import CORS

# Load environment variables from .env
load_dotenv()
app = Flask(__name__)
# Allow CORS for all domains
CORS(app)


@app.before_request
def before_request_func():
    MiddlewareManager.process_request()


# Response middleware
@app.after_request
def after_request_func(response):
    return MiddlewareManager.process_response(response)
    """
    Recursively converts dictionary or list keys from snake_case to camelCase.
    """
    if isinstance(data, list):
        return [
            convert_keys_to_camel_case(item) if isinstance(item, dict) else item
            for item in data
        ]
    if isinstance(data, dict):
        return {
            inflection.camelize(
                k, uppercase_first_letter=False
            ): convert_keys_to_camel_case(v)
            for k, v in data.items()
        }
    return data


@app.route("/")
def index():
    return jsonify({"message": "Server is running"})


try:
    from controllers import *
except Exception as e:
    print(e)


if __name__ == "__main__":
    app.run(debug=True)
