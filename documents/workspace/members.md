## GET WORKSPACE MEMBERS

- path: `/api/workspace/:workspaceAccount/members`
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
    "invites": ["charlie.brown@example.com"],
    "members": [
      {
        "_id": "67b2b7acbecce9a8e1f5f75e",
        "name": "Test",
        "email": "test@example.com",
        "bgColor": "rgb(56.05 183.55 183.55)",
        "textColor": "rgb(11.54 51.12 51.12)",
        "isAdmin": true
      },
      {
        "_id": "67b2b7acbecce9a8e1f5f75f",
        "name": "User1",
        "email": "user1@example.com",
        "bgColor": "rgb(189.4 218 174)",
        "textColor": "rgb(17.99 60.36 6.18)",
        "isAdmin": false
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
