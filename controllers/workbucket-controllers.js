const Workbucket = require("../models/workbucket-models");
const Workfolder = require("../models/workfolder-models");
const Todo = require("../models/todo-models");
const { default: mongoose } = require("mongoose");

const workbucketControllers = {
  updatedWorkspaceBucket: async (req, res) => {
    try {
      const { workspaceId, bucketId } = req.params;
      const { title, isPinned } = req.body;

      const bucket = await Workbucket.findById(bucketId);

      if (!bucket)
        return res.status(404).json({
          success: false,
          message: "工作區群組不存在",
        });

      if (isPinned) {
        const otherPinnedBucket = await Workbucket.findOne({
          workspaceId,
          isPinned: true,
          _id: { $ne: bucketId },
        });

        if (otherPinnedBucket) {
          otherPinnedBucket.isPinned = false;
          await otherPinnedBucket.save();
        }
      }

      bucket.title = title || bucket.title;
      bucket.isPinned = isPinned || bucket.isPinned;

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
  getWorkspaceBuckets: async (req, res) => {
    try {
      const { workspaceId } = req.params;
      const workbuckets = await Workbucket.find({ workspaceId })
        .sort({
          isPinned: -1,
        })
        .exec();

      const buckets = await Promise.all(
        workbuckets.map(async (bucket) => {
          const folderCount = await Workfolder.countDocuments({
            workspaceId,
            workbucketId: bucket._id,
          });
          return {
            ...bucket.toObject(),
            folderCount,
          };
        })
      );

      return res.status(200).json({
        success: true,
        data: buckets,
      });
    } catch (error) {
      console.log(error);
    }
  },
  createdWorkspaceBucket: async (req, res) => {
    try {
      const { workspaceId } = req.params;
      const { title } = req.body;

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
