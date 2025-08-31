# API Specification

### GET /api/schools
- Description: Retrieve all schools
- Method: GET
- Response: 
  ```json
  {
    "schools": [
      {
        "id": 1,
        "name": "string",
        "address": "string",
        "city": "string",
        "state": "string",
        "contact": "number",
        "image": "string",
        "email_id": "string"
      }
    ]
  }
  ```

### GET /api/schools/:id
- Description: Retrieve a specific school by ID
- Method: GET
- Parameters: id (path parameter)
- Response:
  ```json
  {
    "id": 1,
    "name": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "contact": "number",
    "image": "string",
    "email_id": "string"
  }
  ```

### POST /api/schools
- Description: Create a new school
- Method: POST
- Request Body:
  ```json
  {
    "name": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "contact": "number",
    "image": "string",
    "email_id": "string"
  }
  ```
- Response:
  ```json
  {
    "id": 1,
    "name": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "contact": "number",
    "image": "string",
    "email_id": "string"
  }
  ```

### PUT /api/schools/:id
- Description: Update a school by ID
- Method: PUT
- Parameters: id (path parameter)
- Request Body:
  ```json
  {
    "name": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "contact": "number",
    "image": "string",
    "email_id": "string"
  }
  ```
- Response:
  ```json
  {
    "id": 1,
    "name": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "contact": "number",
    "image": "string",
    "email_id": "string"
  }
  ```

### DELETE /api/schools/:id
- Description: Delete a school by ID
- Method: DELETE
- Parameters: id (path parameter)
- Response:
  ```json
  {
    "message": "School deleted successfully"
  }
  ```