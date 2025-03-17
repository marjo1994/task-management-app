import json
from db_connection import get_db_connection  

def lambda_handler(event, context):
    try:
       
        tasks_collection = get_db_connection()
        tasks = list(tasks_collection.find({}, {'_id': 0}))
        
        return {
            'statusCode': 200,
            'body': json.dumps(tasks)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }