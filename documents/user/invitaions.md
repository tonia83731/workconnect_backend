## GET INVITATIONS

- path: `/api/user/:userId/invitations`
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
  "popup": true,
  "data": [
    {
      "id": "67b2d4bba2c47b1835fd6d70",
      "account": "@testspace",
      "title": "測試用工作區",
      "members_count": 4,
      "invites_count": 1
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
  "message": "使用者不存在"
}
```
