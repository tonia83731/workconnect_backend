## GET FOLDER WITH TODOS

- path: `/api/workfolder/:workbucketId/folders-and-todos`
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
      "__v": 0,
      "todos": [
        {
          "_id": "67b460d633f08818b90aa490",
          "workfolderId": "67b435fdc2c3d4be158ab2fd",
          "title": "代辦事項1",
          "status": "pending",
          "deadline": 1741449599999,
          "assignments": [
            {
              "userId": {
                "_id": "67b2b7acbecce9a8e1f5f75f",
                "name": "User1",
                "bgColor": "rgb(189.4 218 174)",
                "textColor": "rgb(17.99 60.36 6.18)"
              },
              "_id": "67bd3aa16fd046af769cc574"
            }
          ],
          "order": 0,
          "checklists": [
            {
              "isChecked": false,
              "text": "123",
              "_id": "67bd3aa16fd046af769cc573"
            }
          ]
        },
        {
          "_id": "67b484940914c3c1bd03da28",
          "workfolderId": "67b435fdc2c3d4be158ab2fd",
          "title": "代辦事項2-2",
          "status": "pending",
          "deadline": 1740758399999,
          "assignments": [
            {
              "userId": {
                "_id": "67b2b7acbecce9a8e1f5f75e",
                "name": "Test",
                "bgColor": "rgb(56.05 183.55 183.55)",
                "textColor": "rgb(11.54 51.12 51.12)"
              },
              "_id": "67b590e7067e3b938d70e38d"
            }
          ],
          "order": 1,
          "checklists": [
            {
              "isChecked": false,
              "text": "項目1",
              "_id": "67b590e7067e3b938d70e38b"
            },
            {
              "isChecked": true,
              "text": "項目2",
              "_id": "67b590e7067e3b938d70e38c"
            }
          ],
          "note": "1. 紀錄\n2. 代辦"
        }
      ]
    },
    {
      "_id": "67b49f8e85031bb5bf4adbec",
      "title": "新增資料夾1updated 123",
      "workspaceId": "67b2d4bba2c47b1835fd6d70",
      "workbucketId": "67b3343d19f113ee6bd809bd",
      "order": 1,
      "createdAt": "2025-02-18T14:56:14.686Z",
      "updatedAt": "2025-02-21T06:03:47.093Z",
      "__v": 0,
      "todos": [
        {
          "_id": "67b8138bf93bdfda605d305b",
          "workfolderId": "67b49f8e85031bb5bf4adbec",
          "title": "今天是星期五 Tomorrow is Saturday",
          "status": "processing",
          "deadline": 1740844799999,
          "assignments": [
            {
              "userId": {
                "_id": "67b2b7acbecce9a8e1f5f75f",
                "name": "User1",
                "bgColor": "rgb(189.4 218 174)",
                "textColor": "rgb(17.99 60.36 6.18)"
              },
              "_id": "67b82a7d7ef290b68b763149"
            },
            {
              "userId": {
                "_id": "67b2b7acbecce9a8e1f5f760",
                "name": "Alice Johnson",
                "bgColor": "#befa82",
                "textColor": "#7b506b"
              },
              "_id": "67b82a7d7ef290b68b76314a"
            },
            {
              "userId": {
                "_id": "67b2b7acbecce9a8e1f5f761",
                "name": "Bob Smith",
                "bgColor": "#30597d",
                "textColor": "#2d1c34"
              },
              "_id": "67b82a7d7ef290b68b76314b"
            }
          ],
          "order": 0,
          "checklists": [
            {
              "isChecked": false,
              "text": "123",
              "_id": "67b82a7d7ef290b68b763146"
            },
            {
              "isChecked": false,
              "text": "456",
              "_id": "67b82a7d7ef290b68b763147"
            },
            {
              "isChecked": false,
              "text": "789",
              "_id": "67b82a7d7ef290b68b763148"
            }
          ],
          "note": "Note here please"
        },
        {
          "_id": "67b81320f93bdfda605d2fc0",
          "workfolderId": "67b49f8e85031bb5bf4adbec",
          "title": "今天是星期五updated",
          "status": "pending",
          "deadline": 1740671999999,
          "assignments": [
            {
              "userId": {
                "_id": "67b2b7acbecce9a8e1f5f760",
                "name": "Alice Johnson",
                "bgColor": "#befa82",
                "textColor": "#7b506b"
              },
              "_id": "67b81340f93bdfda605d3001"
            }
          ],
          "order": 1,
          "checklists": []
        },
        ...
      ]
    },
    {
      "_id": "67b81765f93bdfda605d36df",
      "title": "新增資料夾3",
      "workspaceId": "67b2d4bba2c47b1835fd6d70",
      "workbucketId": "67b3343d19f113ee6bd809bd",
      "order": 2,
      "createdAt": "2025-02-21T06:04:21.145Z",
      "updatedAt": "2025-02-21T06:04:27.160Z",
      "__v": 0,
      "todos": [
        {
          "_id": "67b8227f74c2d3e8e974e259",
          "workfolderId": "67b81765f93bdfda605d36df",
          "title": "Very New at 4 pm",
          "status": "processing",
          "deadline": 1740671999999,
          "assignments": [
            {
              "userId": {
                "_id": "67b2b7acbecce9a8e1f5f75f",
                "name": "User1",
                "bgColor": "rgb(189.4 218 174)",
                "textColor": "rgb(17.99 60.36 6.18)"
              },
              "_id": "67b8337f472ea58ead2043b7"
            }
          ],
          "order": 0,
          "checklists": [
            {
              "isChecked": false,
              "text": "123",
              "_id": "67b8337f472ea58ead2043b4"
            },
            {
              "isChecked": false,
              "text": "456",
              "_id": "67b8337f472ea58ead2043b5"
            },
            {
              "isChecked": false,
              "text": "789",
              "_id": "67b8337f472ea58ead2043b6"
            }
          ],
          "note": "Note"
        },
        {
          "_id": "67b8331fdbb3a706c657ced8",
          "workfolderId": "67b81765f93bdfda605d36df",
          "title": "New at 4 pm",
          "status": "pending",
          "deadline": 1740671999999,
          "assignments": [
            {
              "userId": {
                "_id": "67b2b7acbecce9a8e1f5f75f",
                "name": "User1",
                "bgColor": "rgb(189.4 218 174)",
                "textColor": "rgb(17.99 60.36 6.18)"
              },
              "_id": "67b8331fdbb3a706c657ced9"
            }
          ],
          "order": 1,
          "checklists": []
        }
      ]
    }
  ]
}
```

### API Error
