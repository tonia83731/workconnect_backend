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
      "id": "",
      "name": "",
      "email": ""
    },
    "token": ""
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
