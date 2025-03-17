import json
import uuid
from db_connection import get_db_connection 

def lambda_handler(event, context):
    try:
        tasks_collection = get_db_connection()
        body = json.loads(event['body'])
        
        required_fields = ['title', 'state', 'desc']
        missing_fields = [field for field in required_fields if field not in body]
        
        if missing_fields:
            return {
                'statusCode': 400,
                'body': json.dumps(f'Error: Missing required fields : {", ".join(missing_fields)}')
            }

        if not isinstance(body["title"], str) or not isinstance(body["desc"], str):
            return {
                'statusCode': 400,
                'body': json.dumps('Error: Title and description should be strings.')
            }
        
        task_id = str(uuid.uuid4())

        task = {
            "id": task_id,
            "title": body["title"],
            "state": body["state"],
            "desc": body["desc"]
        }
        
        tasks_collection.insert_one(task)
        
        return {
            'statusCode': 201,
            'body': json.dumps('Task created successfully')
        }
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'body': json.dumps('Error: Invalid JSON format in request body')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }