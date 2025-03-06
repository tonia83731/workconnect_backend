## GET INVITATIONS

- path: `/api/user/:userId/updated-profile`
- method: `PUT`
- role: `user`

**Request:**

- body 需帶入以下參數:
  - (必填) `name: String`
  - (必填) `email: String`
  - `bgColor: String`
  - `textColor: Number`

**Response:**

### API Success

### API Error
