import json
from lambda_function import lambda_handler 

# Simula un evento para la función POST
event_post = {
    "httpMethod": "POST",
    "body": json.dumps({
        "title": "Hello World!",
        "state": "in progress",
        "desc" : "lala"
    })
}

# Prueba la función POST
print("Testing POST...")
response_post = lambda_handler(event_post, None)
print(response_post)