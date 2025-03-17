# API de Gestión de Tareas

Esta es una API RESTful para gestionar tareas. Permite crear, leer, actualizar y eliminar tareas. La API está desplegada en AWS API Gateway y utiliza un backend serverless con Python y MongoDB.

### URL Base
La URL base de la API es:

https://wsaqfp8335.execute-api.us-east-2.amazonaws.com/prod/

---

## **Endpoints**

### 1. Obtener todas las tareas (GET)
Obtiene una lista de todas las tareas almacenadas.

- **URL**: `/getTasks`
- **Método**: `GET`
- **Respuestas**:
  - **Código**: `200 OK`
  - **Ejemplo de respuesta**:
    ```json
    [
      {
        "id": "12345",
        "title": "Task1",
        "state": "To Do",
        "desc": "Lorem Ipsum",

      },
      {
        "id": "67890",
        "title": "Task2",
        "state": "Completed",
        "desc": "Lorem ipsum lala",

      }
    ]
    ```
  - **Código**: `500 Internal Server Error (Error en el servidor)`
  - **Ejemplo de respuesta**: 
    ```json
    {
      "error": "<mensaje de error>"
    }
    ```  
---

### 2. Crear una nueva tarea (POST)
Crea una nueva tarea con un título, descripción y estado.

- **URL**: `/createTask`
- **Método**: `POST`
- **Cuerpo de la solicitud**:
  ```json
  {
    "title": "New Homework",
    "desc": "Description of Newhomework",
    "state": "To Do"
  }
  ```
- **Respuesta exitosa**:
  - **Código**: `201 OK`
  - **Ejemplo de respuesta**:
    ```json
    {
        "message": "Tarea creada exitosamente",
        "task": {
            "id": "12345",
            "title": "New Task",
            "state": "To Do",
            "desc": "Description of new task"
        }
    }
    ```
  - **Código**: `400 Bad Request (Campos faltantes o inválidos)`
  - **Ejemplo de respuesta**(campos faltantes):
    ```json
    {
      "error": "Missing required fields: title, state, desc"
    }
    ```
  - **Ejemplo de respuesta**(tipo de dato inválido):
    ```json
    {
      "error": "Title and description should be strings."
    }
    ```
  - **Código**: `500 Internal Server Error (Error en el servidor)`
  - **Ejemplo de respuesta**(tipo de dato inválido):
    ```json
    {
      "error": "<mensaje de error>"
    }
    ```
---

### 3. Actualizar una nueva tarea (PUT)
  Actualiza el estado de una tarea existente.

- **URL**: `/updateTask/{id}`
- **Método**: `PUT`
- **Parámetros de la URL**:
    id: ID de la tarea a actualizar.
- **Cuerpo de la solicitud**
  ```json
  {
    "state": "In progress"
  }
- **Respuestas**:
  - **Código**: `200 OK (Actualización exitosa)`
  - **Ejemplo de respuesta**:
    ```json
    {
        "message": "Task updated successfully",
        "task": {
            "id": "12345",
            "title": "New Task",
            "state": "In progress",
            "desc": "Description of new task"
        }
    }
    ```
  - **Código**: `400 Bad Request (Solicitud incorrecta)`
  - **Ejemplo de respuesta**(cuerpo de la solicitud faltante): 
    ```json
    {
      "error": "No body found in the request"
    }
    ```
  - **Ejemplo de respuesta** (formato JSON inválido): 
    ```json
    {
      "error": "Invalid JSON format in request body"
    }
    ```
  - **Código**: `404 Not Found (Tarea no encontrada)`
  - **Ejemplo de respuesta**: 
    ```json
    {
      "error": "Task not found"
    }
    ```
  - **Código**: `500 Internal Server Error (Error en el servidor)`
  - **Ejemplo de respuesta**: 
    ```json
    {
      "error": "<mensaje de error>"
    }
    ```  
---

### 3. Eliminar una tarea (DELETE)

- **URL**: `/delateTask/{id}`
- **Método**: `DELETE`
- **Parámetros de la URL**:
    id: ID de la tarea a actualizar.
- **Respuestas**:
  - **Código**: `200 OK`
  - **Ejemplo de respuesta**:
    ```json
    {
       "Task deleted successfully"
    }
    ```
  - **Código**: `404 Not Found`
  - **Ejemplo de respuesta**:
    ```json
    {
       "Task not found"
    }
    ```
  - **Código**: `500 Internal Server Error`
  - **Ejemplo de respuesta**:
    ```json
    {
       "Error: <mensaje de error>"
    }
    ```

    



