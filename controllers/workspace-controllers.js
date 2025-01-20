const Workspace = require("../models/workspace-models");
const User = require("../models/user-models");
const Chat = require("../models/chat-models");
const { default: mongoose } = require("mongoose");

const workspaceControllers = {
  removeWorkspaceMember: async (req, res) => {
    const { _id } = req.user;
    const { workspaceId, memberId } = req.params;

    const [workspace, chat] = await Promise.all([
      Workspace.findById(workspaceId),
      Chat.findOne({ workspaceId }),
    ]);

    if (!workspace)
      return res.status(404).json({
        success: false,
        message: "工作區不存在",
      });

    const setterData = workspace.members.find(
      (member) => member.userId.toString() === _id.toString()
    );
    if (!setterData || !setterData.isAdmin) {
      return res.status(403).json({
        success: false,
        reason: "NOT_ADMIN",
        message: "權限不足: 使用者沒有管理員權限",
      });
    }

    const memberToRemove = workspace.members.find(
      (member) => member.userId.toString() === memberId.toString()
    );
    if (!memberToRemove)
      return res.status(404).json({
        success: false,
        message: "使用者不存在",
      });

    workspace.members = workspace.members.filter(
      (member) => member.userId.toString() !== memberId.toString()
    );
    chat.members = chat.members.filter(
      (member) => member.userId.toString() !== memberId.toString()
    );

    await workspace.save();
    await chat.save();

    return res.status(200).json({
      success: true,
      message: "已成功移除使用者",
    });
  },
  updatedWorkspace: async (req, res) => {
    try {
      const { workspaceId } = req.params;
      const { _id } = req.user;
      const { title } = req.body;
      const workspace = await Workspace.findById(workspaceId);

      const userAdmin = workspace.members.some(
        (member) =>
          member.userId.toString() === _id.toString() && member.isAdmin
      );

      if (!userAdmin)
        return res.status(403).json({
          success: false,
          reason: "NOT_ADMIN",
          message: "權限不足: 使用者沒有管理員權限",
        });

      if (title < 3 || title > 20)
        return res.status(400).json({
          success: false,
          message: "Title需介於3-20位之間",
        });

      workspace.title = title;
      const data = await workspace.save();
      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getWorkspaceMemberlists: async (req, res) => {
    try {
      const { workspaceId } = req.params;
      const workspace = await Workspace.findById(workspaceId).populate({
        path: "members.userId",
        select: "name email",
      });

      if (!workspace)
        return res.status(404).json({
          success: false,
          message: "工作區不存在",
        });

      return res.status(200).json({
        success: true,
        data: {
          invites: workspace.invites,
          members: workspace.members,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  // getWorkspaceMemberlists: async (req, res) => {
  //   try {
  //     const { workspaceId } = req.params;
  //     const workspace = await Workspace.findById(workspaceId).populate({
  //       path: "members.userId",
  //       select: "name email",
  //     });

  //     if (!workspace)
  //       return res.status(404).json({
  //         success: false,
  //         message: "工作區不存在",
  //       });

  //     const data = workspace.members;

  //     return res.status(200).json({
  //       success: true,
  //       data,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  invitedWorkspaceMember: async (req, res) => {
    try {
      // add node mailer
      const { workspaceId } = req.params;
      const { _id } = req.user;
      const { email } = req.body;

      const [workspace, user] = await Promise.all([
        Workspace.findById(workspaceId),
        User.find({ email }),
      ]);
      if (!workspace)
        return res.status(404).json({
          success: false,
          message: "工作區不存在",
        });

      // const isWorkspaceAdmin = workspace.members.find(
      //   (member) => member.userId === _id
      // );
      // if (isWorkspaceAdmin && !isWorkspaceAdmin.id)
      //   return res.status(401).json({
      //     success: false,
      //     message: "Permission denied",
      //   });

      if (workspace.invites.includes(email)) {
        return res.status(200).json({
          success: false,
          message: "此成員已被邀請",
        });
      }

      const isAreadyMember =
        user && workspace.members.some((member) => member.userId === user._id);
      if (isAreadyMember) {
        return res.status(200).json({
          success: false,
          message: "此成員已是成員",
        });
      }

      workspace.invites.push(email);

      await workspace.save();

      return res.status(201).json({
        success: true,
        message: "已成功邀請成員",
      });
    } catch (error) {
      console.log(error);
    }
  },
  setWorkspaceMemberAsAdmin: async (req, res) => {
    try {
      const { workspaceId, memberId } = req.params;
      const { _id } = req.user;

      const workspace = await Workspace.findById(workspaceId);
      if (!workspace)
        return res.status(404).json({
          success: false,
          message: "工作區不存在",
        });

      const setter_member = workspace.members.find((member) => {
        return member.userId.toString() === _id.toString() && member.isAdmin;
      });

      if (!setter_member) {
        return res.status(403).json({
          success: false,
          reason: "NOT_ADMIN",
          message: "權限不足: 使用者沒有管理員權限",
        });
      }

      const target_member = workspace.members.find(
        (member) => member.userId.toString() === memberId.toString()
      );

      if (!target_member)
        return res.status(404).json({
          success: false,
          message: "成員不存在",
        });

      if (target_member.isAdmin)
        return res.status(200).json({
          success: false,
          message: "成員已是管理員",
        });

      target_member.isAdmin = true;
      await workspace.save();

      return res.status(200).json({
        success: true,
        message: "已將此成員設為管理員",
      });
    } catch (error) {
      console.log(error);
    }
  },
  removeWorkspaceMemberAsAdmin: async (req, res) => {
    const { workspaceId, memberId } = req.params;
    const { _id } = req.user;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace)
      return res.status(404).json({
        success: false,
        message: "工作區不存在",
      });

    const setter_member = workspace.members.find(
      (member) => member.userId.toString() === _id.toString() && member.isAdmin
    );
    if (!setter_member) {
      return res.status(403).json({
        success: false,
        reason: "NOT_ADMIN",
        message: "權限不足: 使用者沒有管理員權限",
      });
    }

    const target_member = workspace.members.find(
      (member) => member.userId.toString() === memberId.toString()
    );

    if (!target_member)
      return res.status(404).json({
        success: false,
        message: "成員不存在",
      });

    if (!target_member.isAdmin)
      return res.status(200).json({
        success: false,
        message: "成員已移除管理員身分",
      });

    target_member.isAdmin = false;
    await workspace.save();

    return res.status(200).json({
      success: true,
      message: "已移除此成員管理員身分",
    });
  },
  // -------------------------------------------------------
  createWorkspace: async (req, res) => {
    try {
      const { _id } = req.user;
      const { account, title } = req.body;

      if (!account || !title)
        return res.status(400).json({
          success: false,
          message: "請確認以下欄位已填: account, title",
        });

      if (title < 3 || title > 20)
        return res.status(400).json({
          success: false,
          message: "Title需介於3-20位之間",
        });

      const body = {
        account,
        title,
        members: [
          {
            userId: new mongoose.Types.ObjectId(_id),
            isAdmin: true,
          },
        ],
      };

      const workspace = await Workspace.create(body);

      const chat = await Chat.create({
        workspaceId: workspace.id,
        members: [{ userId: new mongoose.Types.ObjectId(_id) }],
      });

      return res.status(201).json({
        success: true,
        data: {
          workspace,
          chat,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = workspaceControllers;
