const { Server } = require("socket.io");

const socket = (server) => {
  let io = new Server(server, {
    cors: {
      origin: "http://localhost:3035",
    },
  });

  let onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("join_chat", ({ chatId, userId, name }) => {
      // console.log(name, "join the chat");
      socket.join(chatId);
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId}: ${name} joined chat ${chatId}`);

      // console.log(Array.from(onlineUsers.keys()));

      io.emit("updated_online_users", Array.from(onlineUsers.keys()));
      socket.on("send_message", (message) => {
        io.to(chatId).emit("receive_message", message);
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);

      let disconnect_user_id;

      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          disconnect_user_id = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      console.log(`User ${disconnect_user_id} disconnected`);

      io.emit("updated_online_users", Array.from(onlineUsers.keys()));
    });
  });
};

module.exports = socket;
