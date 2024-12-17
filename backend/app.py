from flask import Flask
from dotenv import load_dotenv
from middleware.conversion_middleware import MiddlewareManager
from flask_cors import CORS

# Load environment variables from .env
load_dotenv()
app = Flask(__name__)
# Allow CORS for all domains
CORS(
    app,
    origins="*",
    supports_credentials=True,
    methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.before_request
def before_request_func():
    MiddlewareManager.process_request()


# Response middleware
@app.after_request
def after_request_func(response):
    return MiddlewareManager.process_response(response)


@app.route("/")
def server_route():
    return {"message": "Server is running"}


try:
    from controllers import *
except Exception as e:
    print(e)


if __name__ == "__main__":
    app.run(debug=True)
