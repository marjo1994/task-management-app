import json
from db_connection import get_db_connection 

def lambda_handler(event, context):
    try:
        tasks_collection = get_db_connection()
        task_id = event['pathParameters']['id']
        result = tasks_collection.delete_one({'id': task_id})
        
        if result.deleted_count > 0:
            return {
                'statusCode': 200,
                'body': json.dumps('Task deleted successfully')
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