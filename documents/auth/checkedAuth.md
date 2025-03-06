## CHECK USER AUTHENTICATION

- path: `/api/user/checked-authentication`
- method: `GET`
- role: `user`

**Request:**

- body 無須帶入參數

  **Response:**

### API Success

`status 200`

- Unauthorized

```json
{
  "success": true,
  "data": {
    "isAuth": false
  }
}
```

- Authorized

```json
{
  "success": true,
  "data": {
    "isAuth": true,
    "userId": "67b2b7acbecce9a8e1f5f75e",
    "user": {
      "_id": "67b2b7acbecce9a8e1f5f75e",
      "name": "Test",
      "email": "test@example.com",
      "createdAt": "1739765676263",
      "updatedAt": "1740061352277",
      "bgColor": "rgb(56.05 183.55 183.55)",
      "textColor": "rgb(11.54 51.12 51.12)"
    }
  }
}
```
