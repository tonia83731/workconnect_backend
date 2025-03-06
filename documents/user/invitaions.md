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
      "id": "",
      "account": "",
      "title": "",
      "members_count": 0,
      "invites_count": 0
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
