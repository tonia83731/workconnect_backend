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
            "id": "67b2b7acbecce9a8e1f5f762",
            "name": "Charlie Brown",
            "bgColor": "#4c9552",
            "textColor": "#c40e86"
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
  "message": "工作區不存在"
}
```

```json
{
  "success": false,
  "message": "討論區不存在"
}
```
