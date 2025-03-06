## LOGIN

- path: `/api/login`
- method: `POST`
- role: `user`

**Request:**

- body 需帶入以下參數:
  - (必填) `email: String`
  - (必填) `password: String`

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "67b2b7acbecce9a8e1f5f75e",
      "name": "Test",
      "email": "test@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjJiN2FjYmVjY2U5YThlMWY1Zjc1ZSIsIm5hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzQxMjI3NTg1LCJleHAiOjE3NDE4MzIzODV9.UlgD2ucFABqOZPLDvVvftSYNYV_RirVgkJxXEVrNI20"
  }
}
```

### API Error

`status 400`

- 登入失敗

```json
{
  "success": false,
  "message": "Email or password incorrect"
}
```
