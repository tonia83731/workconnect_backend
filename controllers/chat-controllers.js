const Workspace = require("../models/workspace-models");
const Chat = require("../models/chat-models");
const Message = require("../models/message-models");

const chatControllers = {
  getChat: async (req, res) => {
    try {
      const { workspaceAccount } = req.params;

      const workspace = await Workspace.findOne({
        account: workspaceAccount,
      });

      if (!workspace)
        return res.status(404).json({
          success: false,
          message: "工作區不存在",
        });

      const workspaceId = workspace._id;

      const chat = await Chat.findOne({ workspaceId }).populate({
        path: "lastMessage",
        model: "Message",
        select: "text",
      });

      if (!chat)
        return res.stats(404).json({
          success: false,
          message: "討論區不存在",
        });

      return res.status(200).json({
        success: true,
        data: chat,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getChatWithMessage: async (req, res) => {
    try {
      const { workspaceAccount } = req.params;

      const workspace = await Workspace.findOne({
        account: workspaceAccount,
      });

      if (!workspace)
        return res.status(404).json({
          success: false,
          message: "工作區不存在",
        });

      const workspaceId = workspace._id;

      const chat = await Chat.findOne({ workspaceId }).populate({
        path: "lastMessage",
        model: "Message",
        select: "text",
      });

      if (!chat)
        return res.stats(404).json({
          success: false,
          message: "討論區不存在",
        });

      const messages = await Message.find({
        chatId: chat._id,
        workspaceId,
      })
        .populate({
          path: "senderId",
          model: "User",
          select: "_id name bgColor textColor",
        })
        .lean();

      const formated_messages = messages.map((msg) => {
        return {
          ...msg,
          senderId: msg.senderId._id,
          name: msg.senderId.name,
          bgColor: msg.senderId.bgColor,
          textColor: msg.senderId.textColor,
        };
      });

      return res.status(200).json({
        success: true,
        data: { chat, messages: formated_messages },
      });
    } catch (error) {
      console.log(error);
    }
  },
  getChatMembers: async (req, res) => {
    const { workspaceAccount } = req.params;

    const workspace = await Workspace.findOne({
      account: workspaceAccount,
    });
    if (!workspace)
      return res.status(404).json({
        success: false,
        message: "工作區不存在",
      });

    const workspaceId = workspace._id;
    const chat = await Chat.findOne({ workspaceId }).populate(
      "members.userId",
      "name bgColor textColor"
    );

    if (!chat)
      return res.stats(404).json({
        success: false,
        message: "討論區不存在",
      });

    const members = chat.members.map((member) => ({
      id: member.userId._id,
      name: member.userId.name,
      // letter: member.userId.name[0],
      bgColor: member.userId.bgColor,
      textColor: member.userId.textColor,
    }));

    return res.status(200).json({
      success: true,
      data: members,
    });
  },
  createMessages: async (req, res) => {
    try {
      const { workspaceAccount } = req.params;
      const { chatId, senderId, text } = req.body;

      const workspace = await Workspace.findOne({
        account: workspaceAccount,
      });
      if (!workspace)
        return res.status(404).json({
          success: false,
          message: "工作區不存在",
        });

      const workspaceId = workspace._id;

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

      const new_msg = await Message.create({
        senderId,
        workspaceId,
        chatId,
        text,
      });

      const populated_msg = await Message.findById(new_msg._id)
        .populate({
          path: "senderId",
          model: "User",
          select: "_id name bgColor textColor",
        })
        .lean();

      const formatted_message = {
        ...populated_msg,
        senderId: populated_msg.senderId._id,
        name: populated_msg.senderId.name,
        bgColor: populated_msg.senderId.bgColor,
        textColor: populated_msg.senderId.textColor,
      };

      chat.lastMessage = new_msg._id;
      const updated_chat = await chat.save();
      const populated_chat = await updated_chat.populate("lastMessage");

      return res.status(201).json({
        success: true,
        data: {
          chat: populated_chat,
          message: formatted_message,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = chatControllers;
