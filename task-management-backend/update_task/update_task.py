import json
from db_connection import get_db_connection 

def lambda_handler(event, context):
    try:
        tasks_collection = get_db_connection()
      
        if 'body' not in event:
            return {
                'statusCode': 400,
                'body': json.dumps('Error: No body found in the request')
            }

        try:
            task_data = json.loads(event['body'])
        except json.JSONDecodeError:
            return {
                'statusCode': 400,
                'body': json.dumps('Error: Invalid JSON format in request body')
            }

        allowed_fields = ['title', 'state', 'desc']
        invalid_fields = [field for field in task_data if field not in allowed_fields]

        if invalid_fields:
            return {
                'statusCode': 400,
                'body': json.dumps(f'Error: Invalid fields: {", ".join(invalid_fields)}')
            }

        task_id = event['pathParameters']['id']
        updated_task = json.loads(event['body'])
        
        result = tasks_collection.update_one(
            {'id': task_id},
            {'$set': updated_task}
        )
        
        if result.modified_count > 0:
            return {
                'statusCode': 200,
                'body': json.dumps('Task updated successfully')
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('Task not found')
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }