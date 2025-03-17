from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

def get_db_connection():

    uri = "mongodb+srv://mrhl:LXvHDUQBs0q8ciBM@cluster0.21mzw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(uri, server_api=ServerApi('1'))

    db_name = "task_management"
    collection_name = "tasks"

    db = client[db_name]
    collection = db[collection_name]
    
    return collection