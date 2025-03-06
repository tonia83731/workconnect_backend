## GET CHAT MESSAGES

- path: `/api/chat/:workspaceAccount/messages`
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
    "chat": {
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
        ...
      ],
      "createdAt": "2025-02-17T06:18:35.207Z",
      "updatedAt": "2025-02-21T00:54:43.659Z",
      "__v": 3,
      "lastMessage": { "_id": "67b7ced345a9a877cc097074", "text": "Hello" }
    },
    "messages": [
      {
        "_id": "67b5e1166966ea3074a13513",
        "senderId": "67b2b7acbecce9a8e1f5f75e",
        "workspaceId": "67b2d4bba2c47b1835fd6d70",
        "chatId": "67b2d4bba2c47b1835fd6d73",
        "text": "Hello welcome to the new workspace",
        "createdAt": "2025-02-19T13:48:06.373Z",
        "updatedAt": "2025-02-19T13:48:06.373Z",
        "__v": 0,
        "name": "Test",
        "bgColor": "rgb(56.05 183.55 183.55)",
        "textColor": "rgb(11.54 51.12 51.12)"
      },
      {
        "_id": "67b5e6b66966ea3074a1376d",
        "senderId": "67b2b7acbecce9a8e1f5f75f",
        "workspaceId": "67b2d4bba2c47b1835fd6d70",
        "chatId": "67b2d4bba2c47b1835fd6d73",
        "text": "Thanks for your invite😍",
        "createdAt": "2025-02-19T14:12:06.798Z",
        "updatedAt": "2025-02-19T14:12:06.798Z",
        "__v": 0,
        "name": "User1",
        "bgColor": "rgb(189.4 218 174)",
        "textColor": "rgb(17.99 60.36 6.18)"
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
  "message": "工作區不存在"
}
```

```json
{
  "success": false,
  "message": "討論區不存在"
}
```
