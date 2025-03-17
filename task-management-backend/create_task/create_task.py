import json
import uuid
from db_connection import get_db_connection 

def lambda_handler(event, context):
    try:
        tasks_collection = get_db_connection()
        body = json.loads(event['body'])
        title = body.get('title')
        state = body.get('state')
        description = body.get('desc')
        
        required_fields = ['title', 'state', 'desc']
        missing_fields = [field for field in required_fields if field not in body]
        
        if missing_fields:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': f'Missing required fields: {", ".join(missing_fields)}'})
            }

        if not isinstance(body["title"], str) or not isinstance(body["desc"], str):
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Title and description should be strings.'})
            }
        
        task_id = str(uuid.uuid4())

        tasks_collection.insert_one({
            'id': task_id,  
            'title': title,
            'state': state,
            'desc': description
        })

        inserted_task = {
            'id': task_id,
            'title': title,
            'state': state,
            'desc': description
        }
        
        return {
            'statusCode': 201,
            'body': json.dumps({
                'message': 'Tarea creada exitosamente',
                'task': inserted_task
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }



       