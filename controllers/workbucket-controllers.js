const Workspace = require("../models/workspace-models");
const Workbucket = require("../models/workbucket-models");
const Workfolder = require("../models/workfolder-models");
const Todo = require("../models/todo-models");
const { default: mongoose } = require("mongoose");

const workbucketControllers = {
  updatePinnedBucket: async (req, res) => {
    try {
      const { bucketId } = req.params;

      const bucket = await Workbucket.findById(bucketId);

      bucket.isPinned = !bucket.isPinned;

      const data = await bucket.save();
      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  unpinnedBucket: async (req, res) => {
    try {
      const { bucketId } = req.params;

      const bucket = await Workbucket.findById(bucketId);
      if (!bucket)
        return res.status(404).json({
          success: false,
          message: "工作Bucket不存在",
        });
      if (!bucket.isPinned)
        return res.status(200).json({
          success: false,
          message: "工作Bucket已取消釘選",
        });
      bucket.isPinned = false;

      const data = await bucket.save();
      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updatedWorkspaceBucket: async (req, res) => {
    try {
      const { bucketId } = req.params;
      const { title } = req.body;

      const bucket = await Workbucket.findById(bucketId);

      if (!bucket)
        return res.status(404).json({
          success: false,
          message: "工作Bucket不存在",
        });

      bucket.title = title || bucket.title;

      const data = await bucket.save();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deletedWorkspaceBucket: async (req, res) => {
    try {
      const { bucketId } = req.params;
      const bucket = await Workbucket.findById(bucketId);

      if (!bucket)
        return res.status(404).json({
          success: false,
          message: "工作區群組不存在",
        });

      const deletedFolders = await Workfolder.find({ workbucketId: bucketId });
      const folderIds = deletedFolders.map((folder) => folder._id);

      await Workfolder.deleteMany({ workbucket: bucketId });
      await Todo.deleteMany({ workfolderId: { $in: folderIds } });
      await bucket.deleteOne({ _id: bucketId });

      return res.status(200).json({
        success: true,
        message: "工作區群組及相關資料已刪除",
      });
    } catch (error) {
      console.log(error);
    }
  },
  // V
  getWorkspaceBuckets: async (req, res) => {
    try {
      const { workspaceAccount } = req.params;

      const workspace = await Workspace.findOne({
        account: workspaceAccount,
      });
      const workspaceId = workspace._id;

      const workbuckets = await Workbucket.find({ workspaceId })
        .sort({
          isPinned: -1,
        })
        .exec();

      // console.log(workbuckets);

      return res.status(200).json({
        success: true,
        data: workbuckets,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getWorkspaceBucket: async (req, res) => {
    try {
      const { bucketId } = req.params;
      const bucket = await Workbucket.findById(bucketId);

      if (!bucket)
        return res.status(404).json({
          success: false,
          message: "工作區群組不存在",
        });

      return res.status(200).json({
        success: true,
        data: bucket.title,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // V
  createdWorkspaceBucket: async (req, res) => {
    try {
      const { workspaceAccount } = req.params;
      const { title } = req.body;

      const workspace = await Workspace.findOne({
        account: workspaceAccount,
      });
      const workspaceId = workspace._id;

      const bucket = await Workbucket.create({
        workspaceId: new mongoose.Types.ObjectId(workspaceId),
        title,
      });

      return res.status(201).json({
        success: true,
        data: bucket,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = workbucketControllers;
