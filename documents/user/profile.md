## GET INVITATIONS

- path: `/api/user/:userId/profile`
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
    "_id": "67b2b7acbecce9a8e1f5f75e",
    "name": "Test",
    "email": "test@example.com",
    "__v": 0,
    "createdAt": "2025-02-17T04:14:36.263Z",
    "updatedAt": "2025-02-20T14:22:32.277Z",
    "bgColor": "rgb(56.05 183.55 183.55)",
    "textColor": "rgb(11.54 51.12 51.12)"
  }
}
```

### API Error

`status 404`

```json
{
  "success": false,
  "message": "使用者不存在"
}
```
