## GET FOLDERS

- path: `/api/workfolder/:workbucketId/folders`
- method: `GET`
- role: `user`

**Request:**

- body 無須帶入參數

**Response:**

### API Success

`status 200`

- bucket 內沒有 folder 的時候

```json
{
  "success": true,
  "data": []
}
```

```json
{
  "success": true,
  "data": [
    {
      "_id": "67b435fdc2c3d4be158ab2fd",
      "title": "新增資料夾0 修改",
      "workspaceId": "67b2d4bba2c47b1835fd6d70",
      "workbucketId": "67b3343d19f113ee6bd809bd",
      "order": 0,
      "createdAt": "2025-02-18T07:25:49.477Z",
      "updatedAt": "2025-02-18T07:59:43.328Z",
      "__v": 0
    },
    {
      "_id": "67b49f8e85031bb5bf4adbec",
      "title": "新增資料夾1updated 123",
      "workspaceId": "67b2d4bba2c47b1835fd6d70",
      "workbucketId": "67b3343d19f113ee6bd809bd",
      "order": 1,
      "createdAt": "2025-02-18T14:56:14.686Z",
      "updatedAt": "2025-02-21T06:03:47.093Z",
      "__v": 0
    },
    {
      "_id": "67b81765f93bdfda605d36df",
      "title": "新增資料夾3",
      "workspaceId": "67b2d4bba2c47b1835fd6d70",
      "workbucketId": "67b3343d19f113ee6bd809bd",
      "order": 2,
      "createdAt": "2025-02-21T06:04:21.145Z",
      "updatedAt": "2025-02-21T06:04:27.160Z",
      "__v": 0
    }
  ]
}
```
