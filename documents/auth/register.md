## Register

- path: `/api/register`
- method: `POST`
- role: `user`

**Request:**

- body 需帶入以下參數:
  - (必填) `name: String`
  - (必填) `email: String`
  - (必填) `password: String` (需大於 4 字)

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "message": "使用者註冊成功"
}
```

### API Error

`status 400`

- 必填項目空白

```json
{
  "success": false,
  "message": "請確實輸入以下訊息: name, email, password"
}
```

- 格式錯誤

```json
{
  "success": false,
  "message": "Email格式錯誤"
}
```

```json
{
  "success": false,
  "message": "Password需大於4碼"
}
```

- 使用者已存在

```json
{
  "success": false,
  "message": "Email已經註冊，請選擇登入"
}
```
