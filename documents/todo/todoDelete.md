## DELETED TODO

- path: `/api/todo/:workfolderId/:todoId/delete-todo`
- method: `DELETE`
- role: `user`

**Request:**

- body 無須帶入參數

**Response:**

### API Success

`status`

```json
{
  "success": true,
  "message": "代辦事項已刪除"
}
```

### API Error

`status 404`

```json
{
  "success": false,
  "message": "代辦事項不存在"
}
```
