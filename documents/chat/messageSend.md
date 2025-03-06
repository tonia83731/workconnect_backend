## SEND MESSAGES

- path: `/api/chat/:workspaceAccount/send-message`
- method: `POST`
- role: `user`

**Request:**

- body 需帶入以下參數:
  - (必填) `chatId: String`
  - (必填) `senderId: String`
  - (必填) `text: String`

**Response:**

### API Success

### API Error

`status 400`

- 必填項目未填

```json
{
  "success": false,
  "message": "請確認以下欄位是否填入: chatId, senderId, text"
}
```

- 格式 or 字數錯誤

```json
{
  "success": false,
  "message": "請確認text字數需低於1024"
}
```

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
