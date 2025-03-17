import json
from db_connection import get_db_connection

def lambda_handler(event, context):
    try:
        tasks_collection = get_db_connection()

        if 'body' not in event:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'No body found in the request'})
            }

        try:
            task_data = json.loads(event['body'])
        except json.JSONDecodeError:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Invalid JSON format in request body'})
            }

        task_id = event['pathParameters']['id']

        result = tasks_collection.update_one(
            {'id': task_id},
            {'$set': task_data} 
        )

        if result.modified_count > 0:
            updated_task = tasks_collection.find_one({'id': task_id}, {'_id': 0})
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'message': 'Task updated successfully',
                    'task': updated_task
                })
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Task not found'})
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }