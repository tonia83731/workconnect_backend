## CREATED TODO

- path: `/api/todo/:workfolderId/create-todo`
- method: `POST`
- role: `user`

**Request:**

- body 需帶入以下參數:
  - (必填) `title: String`
  - `deadline: Number`
  - `assignments: Array`，需要包含以下資訊:
    - `userId: String`

**Response:**

### API Success

`status 201`

```json
{
  "success": true,
  "data": {
        "_id":"67b460d633f08818b90aa490",
        "workfolderId":"67b435fdc2c3d4be158ab2fd",
        "title":"代辦事項1",
        "status":"pending",
        "deadline":1741449599999,
        "assignments":[
            {
                "userId": "67b2b7acbecce9a8e1f5f75f"
            },
            ...
        ],
        "order": 0,
        "checklists": [
            {
                "isChecked": false,
                "text": "123",
                "_id": "67bd3aa16fd046af769cc573",
                "createdAt": "1739874518167",
                "updatedAt": "1740623184141"
            },
            ...
        ]
    }
}
```

### API Error

`status 400`

- 必填參數空白

```json
{
  "success": false,
  "message": "請確認以下欄位是否填入: workfolderId, title"
}
```

- 參數格式錯誤

```json
{
  "success": false,
  "message": "Title需介於3-50字之間"
}
```

```json
{
  "success": false,
  "message": "Deadline不能小於今日"
}
```
