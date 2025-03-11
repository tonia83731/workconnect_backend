# WORKCONNECT (Vue Vite + Pinia + NodeJS + Mongodb)

## 製作背景/目的

本平台目的為提供一個高效的計畫規劃與溝通工具，讓團隊能夠在線上協作，管理日程，並提升工作效率。無論是團隊專案還是個人行程安排，都能透過本平台輕鬆掌握進度，確保計畫順利執行。

## 專案角色

- 前端與後端的開發與優化: 根據需求提供相對應的 API (使用 MongoDB)，並交付前端進行視覺化顯示

## 相關連結

- 參考 API 文件，請參考 [workconnect_backend_docs](https://github.com/tonia83731/workconnect_backend_docs)

- 前端開發部署，請參考 [workconnect_frontend](https://github.com/tonia83731/workconnect_frontend)

## 專案挑戰與解決

- 問題: 在進行 TODO 托拽後端儲存時，不知道要如何更新有關係的項目順序
  - 解決方案: 將有相關的 folder 內的 todo 以**陣列**方式傳入: 內需包含`todoId`及`order`

## 使用工具

- express @4.21.1
- passport @0.7.0
- passport-jwt @4.0.1
- passport-local @1.0.0
- mongoose @8.9.3
- nodemailer @6.10.0
- googleapis @144.0.0
- cors @2.8.5
- bcryptjs @2.4.3
- socket.io @4.8.1
- validator @13.12.0

## 後續發展

- 考慮是否要加入 1v1 的 Chat Room (無需進入 Workspace 也可以聊天)
- Chat Room 是否可以建立最新消息通知(需新增 Message Schema)，包含溝通內容、創建內容、新加入的成員等

## 專案設定

```sh
git clone https://github.com/tonia83731/workconnect_backend.git
```

```sh
npm install
```

```sh
npm run dev
```
