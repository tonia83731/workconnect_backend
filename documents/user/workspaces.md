## GET USER WORKSPACES

- path: `/api/user/:userId/workspace`
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
    // 使用者所有有權限的工作區
    {
      "_id": "67b2d4bba2c47b1835fd6d70",
      "account": "@testspace",
      "title": "測試用工作區",
      "invites": ["charlie.brown@example.com"],
      "members": [
        {
          "userId": "67b2b7acbecce9a8e1f5f75e",
          "isAdmin": true,
          "_id": "67b2d4bba2c47b1835fd6d71"
        },
        {
          "userId": "67b2b7acbecce9a8e1f5f75f",
          "isAdmin": false,
          "_id": "67b3f85f4984ebcb5e4f8b19"
        },
        {
          "userId": "67b2b7acbecce9a8e1f5f760",
          "isAdmin": false,
          "_id": "67b5dd21ed957035f38d988f"
        },
        {
          "userId": "67b2b7acbecce9a8e1f5f761",
          "isAdmin": false,
          "_id": "67b5dd8aed957035f38d990e"
        }
      ],
      "createdAt": "2025-02-17T06:18:35.187Z",
      "updatedAt": "2025-02-20T15:28:28.395Z",
      "__v": 8,
      "memberCount": 4,
      "adminCount": 1
    },
    {
      "_id": "67b2d64ba2c47b1835fd6dac",
      "account": "@testspace2",
      "title": "測試用工作區2",
      "invites": [],
      "members": [
        {
          "userId": "67b2b7acbecce9a8e1f5f75e",
          "isAdmin": true,
          "_id": "67b2d64ba2c47b1835fd6dad"
        }
      ],
      "createdAt": "2025-02-17T06:25:15.868Z",
      "updatedAt": "2025-02-17T06:25:15.868Z",
      "__v": 0,
      "memberCount": 1,
      "adminCount": 1
    }
  ]
}
```

### API Error
