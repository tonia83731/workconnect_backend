## GET INVITATIONS

- path: `/api/user/:userId/:workspaceId/invitations-canceled`
- method: `POST`
- role: `user`

**Request:**

- body 無須帶入參數

**Response:**

### API Success

### API Error

`status 404`

```json
{
  "success": false,
  "message": "使用者不存在"
}
```
