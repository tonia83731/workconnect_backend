const express = require("express");
const router = express.Router();
const { workspaceAuthenticated } = require("../../middleware/api-auth");
const workfolderControllers = require("../../controllers/workfolder-controllers");

//V
router.get(
  "/:workspaceId/:workbucketId/folders",
  workspaceAuthenticated,
  workfolderControllers.getWorkfolders
);
// V
router.get(
  "/:workspaceId/:workbucketId/folders-and-todos",
  workspaceAuthenticated,
  workfolderControllers.getWorkfoldersWithTodo
);
// V
router.put(
  "/:workspaceId/:folderId/update-folder",
  workspaceAuthenticated,
  workfolderControllers.updatedWorkfolder
);
// V
router.put(
  "/:workspaceId/:folderId/updated-folder-title",
  workspaceAuthenticated,
  workfolderControllers.updatedWorkfolderTitle
);
// V
router.delete(
  "/:workspaceId/:folderId/delete-folder",
  workspaceAuthenticated,
  workfolderControllers.deleteWorkfolder
);
// V
router.post(
  "/:workspaceId/create-folder",
  workspaceAuthenticated,
  workfolderControllers.createdWorkfolder
);

module.exports = router;
