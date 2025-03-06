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
        "_id":"67b2d4bba2c47b1835fd6d73","workspaceId":"67b2d4bba2c47b1835fd6d70",
        "members":[
            {
            "userId":"67b2b7acbecce9a8e1f5f75e",
            "_id":"67b2d4bba2c47b1835fd6d74"
            },
            ...
        ],
        "createdAt":"1739773115207",
        "updatedAt":"1740099283659",
        "lastMessage":"67b7ced345a9a877cc097074"
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
