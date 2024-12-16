from pymongo import MongoClient
import os
import sys


MONGO_URI = os.environ.get("MONGO_URI")
MONGO_DB_NAME = os.environ.get("MONGO_DB_NAME")


class Database:
    def __init__(self):
        try:
            print("MongoDB connection initializing...")
            print(MONGO_DB_NAME, MONGO_URI)
            self.client = MongoClient(MONGO_URI)  # Timeout after 5000ms
            # Force a connection attempt
            self.client.server_info()

            self.db = self.client[MONGO_DB_NAME]
            print("MongoDB connection established.")
        except Exception as e:
            print("Failed to connect to MongoDB:", e)
            sys.exit(1)  # Exit the program if DB connection fails


database_instance = Database()
db = database_instance.db
