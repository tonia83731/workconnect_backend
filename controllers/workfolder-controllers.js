const Workfolder = require("../models/workfolder-models");
const Todo = require("../models/todo-models");

const workfolderControllers = {
  getWorkfolders: async (req, res) => {
    try {
      const { workspaceId, workbucketId } = req.params;
      const folders = await Workfolder.find({
        workspaceId,
        workbucketId,
      }).exec();

      if (!folders.length)
        return res.status(200).json({
          success: true,
          data: [],
        });

      return res.status(200).json({
        success: true,
        data: folders,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getWorkfoldersWithTodo: async (req, res) => {
    try {
      const { workspaceId, workbucketId } = req.params;
      const folders = await Workfolder.find({
        workspaceId,
        workbucketId,
      }).exec();

      if (!folders.length)
        return res.status(200).json({
          success: true,
          data: [],
        });

      const foldersWithTodo = await Promise.all(
        folders.map(async (folder) => {
          const todos = await Todo.find({ workfolderId: folder._id })
            .select("title note status deadline checklists assignments order")
            .populate({
              path: "assignments.userId",
              select: "name",
            })
            .sort({ order: -1 })
            .exec();

          return {
            ...folder.toObject(),
            todos,
          };
        })
      );

      return res.status(200).json({
        success: true,
        data: foldersWithTodo,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updatedWorkfolder: async (req, res) => {
    try {
      const { workspaceId, folderId } = req.params;
      const { workbucketId, updatedOrder } = req.body;

      const folder = await Workfolder.findById(folderId);

      if (!folder)
        return res.status(404).json({
          success: false,
          message: "資料夾不存在",
        });

      const isNewBucket =
        workbucketId && workbucketId !== folder.workbucketId.toString();

      const currBucketFolders = await Workfolder.find({
        workspaceId,
        workbucketId: folder.workbucketId,
      }).sort({ order: 1 });

      if (isNewBucket) {
        const newBucketFolders = await Workfolder.find({
          workspaceId,
          workbucketId,
        }).sort({ order: 1 });

        const updatedCurrBucketFolders = currBucketFolders
          .filter((f) => f._id.toString() !== folderId)
          .map((f, index) => ({
            ...f.toObject(),
            order: index,
          }));

        const currBucketOps = updatedCurrBucketFolders.map((f) => ({
          updateOne: {
            filter: { _id: f._id },
            update: { order: f.order },
          },
        }));

        await Workfolder.bulkWrite(currBucketOps);

        folder.workbucketId = workbucketId;
        folder.order = newBucketFolders.length;
        const updated_folder = await folder.save();

        return res.status(200).json({
          success: true,
          data: updated_folder,
        });
      }

      if (!isNewBucket && updatedOrder === undefined) {
        return res.status(400).json({
          success: false,
          message: "無效的更新條件",
        });
      }

      const remainingFolders = currBucketFolders.filter(
        (folder) => folder._id.toString() !== folderId
      );

      const updatedFolder = [
        ...remainingFolders.slice(0, updatedOrder),
        folder,
        ...remainingFolders.slice(updatedOrder),
      ];

      updatedFolder.forEach((folder, index) => {
        folder.order = index;
      });

      const bulkOps = updatedFolder.map((folder) => ({
        updateOne: {
          filter: { _id: folder._id },
          update: { order: folder.order },
        },
      }));

      await Workfolder.bulkWrite(bulkOps);
      const updated_folder = await folder.save();

      return res.status(200).json({
        success: true,
        data: updated_folder,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updatedWorkfolderTitle: async (req, res) => {
    try {
      const { folderId } = req.params;
      const { title } = req.body;
      const folder = await Workfolder.findById(folderId);

      if (!folder)
        return res.status(404).json({
          success: false,
          message: "資料夾不存在",
        });

      folder.title = title || folder.title;

      const updated_folder = await folder.save();

      return res.status(200).json({
        success: true,
        data: updated_folder,
      });
    } catch (error) {
      console.log(error);
    }
  },

  // add order
  deleteWorkfolder: async (req, res) => {
    try {
      const { workspaceId, folderId } = req.params;
      const folder = await Workfolder.findById(folderId);

      if (!folder)
        return res.status(404).json({
          success: false,
          message: "資料夾不存在",
        });

      const workfolders = await Workfolder.find({
        workspaceId,
        workbucketId: folder.workbucketId,
      }).sort({ order: 1 });

      let isDeleteFolder = false;

      for (let folder of workfolders) {
        if (isDeleteFolder) {
          folder.order -= 1;
          await folder.save();
        }
        if (folder._id.toString() === folderId) {
          isDeleteFolder = true;
        }
      }

      await Todo.deleteMany({ workfolderId: folderId });
      await folder.deleteOne();

      return res.status(200).json({
        success: true,
        message: "資料夾及相關代辦事項已清除",
      });
    } catch (error) {
      console.log(error);
    }
  },
  createdWorkfolder: async (req, res) => {
    try {
      const { workspaceId } = req.params;
      const { workbucketId, title } = req.body;
      const orderCount = await Workfolder.countDocuments({
        workspaceId,
        workbucketId,
      }).exec();

      const folder = await Workfolder.create({
        title,
        workspaceId,
        workbucketId,
        order: orderCount,
      });

      return res.status(201).json({
        success: true,
        data: folder,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = workfolderControllers;
