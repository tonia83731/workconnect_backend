const Chat = require("../models/chat-models");
const Message = require("../models/message-models");

const chatControllers = {
  getChatWithMessage: async (req, res) => {
    try {
      const { workspaceId } = req.params;
      const chat = await Chat.findOne({ workspaceId });

      if (!chat)
        return res.stats(404).json({
          success: false,
          message: "討論區不存在",
        });

      const messages = await Message.find({
        chatId: chat._id,
        workspaceId,
      }).populate({
        path: "senderId",
        model: "User",
        select: "_id name email",
      });
      // console.log(chat._id, messages);

      return res.status(200).json({
        success: true,
        data: { chat, messages },
      });
    } catch (error) {
      console.log(error);
    }
  },
  // getChatMembers: async (req, res) => {
  //   const { workspaceId } = req.params;
  //   const chat = await Chat.findOne({ workspaceId }).populate(
  //     "members.userId",
  //     "name"
  //   );

  //   if (!chat)
  //     return res.stats(404).json({
  //       success: false,
  //       message: "討論區不存在",
  //     });

  //   const members = chat.members.map((member) => ({
  //     id: member.userId._id,
  //     name: member.userId.name,
  //   }));

  //   return res.status(200).json({
  //     success: true,
  //     data: members,
  //   });
  // },
  createMessages: async (req, res) => {
    try {
      const { workspaceId } = req.params;
      const { chatId, senderId, text } = req.body;

      const chat = await Chat.findById(chatId);

      if (!chat)
        return res.status(404).json({
          success: false,
          message: "討論區不存在",
        });

      if (!chatId || !senderId || !text)
        return res.status(400).json({
          success: false,
          message: "請確認以下欄位是否填入: chatId, senderId, text",
        });

      if (text.length > 1024)
        return res.status(400).json({
          success: false,
          message: "請確認text字數需低於1024",
        });

      const data = await Message.create({
        senderId,
        workspaceId,
        chatId,
        text,
      });

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = chatControllers;
