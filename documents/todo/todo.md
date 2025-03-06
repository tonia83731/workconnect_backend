## UPDATED TODO

- path: `/api/todo/:todoId/todo-item`
- method: `GET`
- role: `user`

**Request:**

- body 無須帶入參數

**Response:**

### API Success

`status 200`

```json
{
    "success": true,
    "data": {
        "_id":"67b460d633f08818b90aa490",
        "workfolderId":"67b435fdc2c3d4be158ab2fd",
        "title":"代辦事項1",
        "status":"pending",
        "deadline":1741449599999,
        "assignments":[
            {
                "userId": "67b2b7acbecce9a8e1f5f75f"
            },
            ...
        ],
        "order": 0,
        "checklists": [
            {
                "isChecked": false,
                "text": "123",
                "_id": "67bd3aa16fd046af769cc573",
                "createdAt": "1739874518167",
                "updatedAt": "1740623184141"
            },
            ...
        ]
    }
}
```

### API Error

`status 404`

```json
{
  "success": false,
  "message": "代辦事項不存在"
}
```
