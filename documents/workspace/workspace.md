## GET WORKSPACE INFO

- path: `/api/workspace/:workspaceAccount/workspace-info`
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
  "data": {
    "title": "測試用工作區",
    "account": "@testspace",
    "memberCount": 4,
    "inviteCount": 1,
    "workbucketCount": 4,
    "workfolderCount": 6
  }
}
```

### API Error
