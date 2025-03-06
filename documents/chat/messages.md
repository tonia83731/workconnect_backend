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
  "chat": {
    "_id": "67b2d4bba2c47b1835fd6d73",
    "workspaceId": { "$oid": "67b2d4bba2c47b1835fd6d70" },
    "members": [
      {
        "userId": "67b2b7acbecce9a8e1f5f75e",
        "_id": "67b2d4bba2c47b1835fd6d74"
      }
    ],
    "updatedAt": "1740099283659",
    "lastMessage": "67b7ced345a9a877cc097074"
  },
  "messages": [
        {
            "_id":"67b5e1166966ea3074a13513","senderId":"67b2b7acbecce9a8e1f5f75e","workspaceId":"67b2d4bba2c47b1835fd6d70","chatId":"67b2d4bba2c47b1835fd6d73","text":"Hello welcome to the new workspace","createdAt":"1739972886373",
            "updatedAt":"1739972886373",
            "senderId": "67b2b7acbecce9a8e1f5f762",
            "name": "Charlie Brown",
            "bgColor": "#4c9552",
            "textColor": "#c40e86"
        },
        ...
    ]
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
