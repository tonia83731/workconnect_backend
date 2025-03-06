## UPDATED TODO POSITION

- path: `/api/todo/:sourceFolderId/:targetFolderId/:todoId/updated-position`
- method: `PUT`
- role: `user`

**Request:**

- body 需帶入以下參數:
  - (必填) todos: Array，需要包含以下資訊:
    - `_id: String` // todoId
    - `order: Number`

**Response:**

### API Success

`status 200`

```json
{
  "success": true,
  "message": "Todo順序已更新"
}
```

### API Error

`status 400`

- 參數格式錯誤

```json
{
  "success": false,
  "message": "todos 格式錯誤，需使用Array; 須包含 todoId, order"
}
```

`status 404`

```json
{
  "success": false,
  "message": "Todo不存在"
}
```
