## TODOS

- path: `/api/todo/:workfolderId/folder-todos`
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
  "data": [
    {
      "_id": "67b484940914c3c1bd03da28",
      "workfolderId": "67b435fdc2c3d4be158ab2fd",
      "title": "代辦事項2-2",
      "status": "pending",
      "deadline": 1740758399999,
      "assignments": [
        {
          "userId": {
            "_id": "67b2b7acbecce9a8e1f5f75e",
            "name": "Test",
            "bgColor": "rgb(56.05 183.55 183.55)",
            "textColor": "rgb(11.54 51.12 51.12)"
          },
          "_id": "67b590e7067e3b938d70e38d"
        }
      ],
      "order": 1,
      "checklists": [
        {
          "isChecked": false,
          "text": "項目1",
          "_id": "67b590e7067e3b938d70e38b"
        },
        {
          "isChecked": true,
          "text": "項目2",
          "_id": "67b590e7067e3b938d70e38c"
        }
      ],
      "createdAt": "2025-02-18T13:01:08.352Z",
      "updatedAt": "2025-02-27T02:26:24.141Z",
      "__v": 8,
      "note": "1. 紀錄\n2. 代辦"
    },
    {
      "_id": "67b460d633f08818b90aa490",
      "workfolderId": "67b435fdc2c3d4be158ab2fd",
      "title": "代辦事項1",
      "status": "pending",
      "deadline": 1741449599999,
      "assignments": [
        {
          "userId": {
            "_id": "67b2b7acbecce9a8e1f5f75f",
            "name": "User1",
            "bgColor": "rgb(189.4 218 174)",
            "textColor": "rgb(17.99 60.36 6.18)"
          },
          "_id": "67bd3aa16fd046af769cc574"
        }
      ],
      "order": 0,
      "checklists": [
        { "isChecked": false, "text": "123", "_id": "67bd3aa16fd046af769cc573" }
      ],
      "createdAt": "2025-02-18T10:28:38.167Z",
      "updatedAt": "2025-02-27T02:26:24.141Z",
      "__v": 2
    }
  ]
}
```
