## GET CHAT MEMBERS

- path: `/api/chat/:workspaceAccount/members`
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
  "data": [
    {
      "id": "67b2b7acbecce9a8e1f5f75e",
      "name": "Test",
      "bgColor": "rgb(56.05 183.55 183.55)",
      "textColor": "rgb(11.54 51.12 51.12)"
    },
    {
      "id": "67b2b7acbecce9a8e1f5f75f",
      "name": "User1",
      "bgColor": "rgb(189.4 218 174)",
      "textColor": "rgb(17.99 60.36 6.18)"
    },
    {
      "id": "67b2b7acbecce9a8e1f5f760",
      "name": "Alice Johnson",
      "bgColor": "#befa82",
      "textColor": "#7b506b"
    },
    {
      "id": "67b2b7acbecce9a8e1f5f761",
      "name": "Bob Smith",
      "bgColor": "#30597d",
      "textColor": "#2d1c34"
    }
  ]
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

```json
{
  "success": false,
  "message": "討論區不存在"
}
```
