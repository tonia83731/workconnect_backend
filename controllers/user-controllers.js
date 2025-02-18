const User = require("../models/user-models");
const Workspace = require("../models/workspace-models");
const Chat = require("../models/chat-models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { default: mongoose } = require("mongoose");
const { nodeMailer } = require("../helpers/mail-helper");

const userControllers = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password)
        return res.status(400).json({
          success: false,
          message: "請確實輸入以下訊息: name, email, password",
        });

      if (!validator.isEmail(email))
        return res.status(400).json({
          success: false,
          message: "Email格式錯誤",
        });

      if (password.length < 4)
        return res.status(400).json({
          success: false,
          message: "Password需大於4碼",
        });

      const isEmailExisted = await User.findOne({ email });

      if (isEmailExisted)
        return res.status(400).json({
          success: false,
          message: "Email已經註冊，請選擇登入",
        });

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      await User.create({
        name,
        email,
        password: hash,
      });

      // const mail_text = `Thank you for registering with Workconnect! We are excited to have you on board.\nYour registration has been successfully completed. You can now access all of our services and start exploring opportunities with us.`;

      // nodeMailer(
      //   name,
      //   email,
      //   "Welcome to Workconnect - Your Registration is Successful",
      //   mail_text
      // );

      return res.status(201).json({
        success: true,
        message: "使用者註冊成功",
      });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const data = await User.findOne({ email });

      if (!data)
        return res.status(400).json({
          success: false,
          messsage: "Email或密碼錯誤",
        });

      const isValid = await bcrypt.compare(password, data.password);
      if (!isValid)
        return res.status(400).json({
          success: false,
          messsage: "Email或密碼錯誤",
        });

      const user = data.toJSON();
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        success: true,
        data: {
          user: payload,
          token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  checkAuthentication: async (req, res) => {
    try {
      const { _id } = req.user;

      const user = await User.findById(_id);
      if (!user)
        return res.status(200).json({
          success: true,
          data: {
            isAuth: false,
          },
        });

      return res.status(200).json({
        success: true,
        data: {
          isAuth: true,
          userId: _id,
          user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).lean();
      if (!user)
        return res.status(404).json({
          success: false,
          message: "使用者不存在",
        });
      delete user.password;
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updatedUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, email } = req.body;

      const user = await User.findById(userId);
      if (!user)
        return res.status(404).json({
          success: false,
          message: "使用者不存在",
        });

      if (email && !validator.isEmail(email))
        return res.status(400).json({
          success: false,
          message: "Email格式錯誤",
        });

      // if (password && password.length < 4)
      //   return res.status(400).json({
      //     success: false,
      //     message: "Password需大於4碼",
      //   });

      const isEmailExisted = await User.findOne({ email });
      if (user.email !== email && isEmailExisted)
        return res.status(400).json({
          success: false,
          message: "Email已經註冊，請選擇不同的email",
        });

      // console.log(name, email, password);

      user.name = name || user.name;
      user.email = email || user.email;
      // user.password = password || user.password;

      const data = await user.save();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getUserWorkspace: async (req, res) => {
    try {
      const { userId } = req.params;

      const workspaces = await Workspace.aggregate([
        {
          $match: {
            "members.userId": new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $addFields: {
            memberCount: { $size: "$members" }, // Total members count
            adminCount: {
              $size: {
                $filter: {
                  input: "$members",
                  as: "member",
                  cond: { $eq: ["$$member.isAdmin", true] },
                },
              },
            },
          },
        },
      ]).exec();

      return res.status(200).json({
        success: true,
        data: workspaces,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  },
  confirmWorkspaceInvitations: async (req, res) => {
    try {
      const { userId, workspaceId } = req.params;

      const user = await User.findById(userId).exec();
      if (!user)
        return res.status(404).json({
          success: false,
          message: "使用者不存在",
        });

      const updatedWorkspace = await Workspace.findOneAndUpdate(
        {
          _id: workspaceId,
          invites: user.email,
        },
        {
          $pull: {
            invites: user.email,
          },
          $push: {
            members: {
              userId,
              isAdmin: false,
            },
          },
        },
        { new: true }
      ).exec();

      if (!updatedWorkspace)
        return res.status(404).json({
          success: false,
          message: "工作區不存在",
        });

      const chat = await Chat.findOne({ workspaceId });

      if (chat) {
        chat.members.push({ userId });
        await chat.save();
      }

      return res.status(200).json({
        success: true,
        data: updatedWorkspace,
      });
    } catch (error) {
      console.log(error);
    }
  },
  cancelWorkspaceInvitations: async (req, res) => {
    try {
      const { userId, workspaceId } = req.params;

      const user = await User.findById(userId).exec();
      if (!user)
        return res.status(404).json({
          success: false,
          message: "使用者不存在",
        });

      const updatedWorkspace = await Workspace.findOneAndUpdate(
        {
          _id: workspaceId,
          invites: user.email,
        },
        {
          $pull: {
            invites: user.email,
          },
        }
      );

      return res.status(200).json({
        success: true,
        data: updatedWorkspace,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getWorkspaceInvitations: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).exec();
      if (!user)
        return res.status(404).json({
          success: false,
          message: "使用者不存在",
        });

      const workspaces = await Workspace.aggregate([
        {
          $match: {
            invites: user.email,
          },
        },
      ]).exec();

      const data = workspaces.map((workspace) => ({
        id: workspace._id,
        account: workspace.account,
        title: workspace.title,
        members_count: workspace.members.length,
        invites_count: workspace.invites.length,
      }));

      return res.status(200).json({
        success: true,
        popup: workspaces.length > 0,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = userControllers;
