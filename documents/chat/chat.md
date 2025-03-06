## GET CHAT

- path: `/api/chat/:workspaceAccount/chat`
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
    "_id": "67b2d4bba2c47b1835fd6d73",
    "workspaceId": "67b2d4bba2c47b1835fd6d70",
    "members": [
      {
        "userId": "67b2b7acbecce9a8e1f5f75e",
        "_id": "67b2d4bba2c47b1835fd6d74"
      },
      {
        "userId": "67b2b7acbecce9a8e1f5f75f",
        "_id": "67b3f85f4984ebcb5e4f8b1f"
      },
      {
        "userId": "67b2b7acbecce9a8e1f5f760",
        "_id": "67b5dd21ed957035f38d9897"
      },
      {
        "userId": "67b2b7acbecce9a8e1f5f761",
        "_id": "67b5dd8aed957035f38d9918"
      }
    ],
    "createdAt": "2025-02-17T06:18:35.207Z",
    "updatedAt": "2025-02-21T00:54:43.659Z",
    "__v": 3,
    "lastMessage": {
      "_id": "67b7ced345a9a877cc097074",
      "text": "Hello"
    }
  }
}
```

### API Error

`status 404`

```json
{
  "success": false,
  "message": "討論區不存在"
}
```
