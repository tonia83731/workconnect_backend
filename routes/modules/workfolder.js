const express = require("express");
const router = express.Router();

const workfolderControllers = require("../../controllers/workfolder-controllers");

router.post(
  "/:workspaceAccount/:workbucketId/create-folder",
  workfolderControllers.createdWorkfolder
);

router.put(
  "/:workspaceId/:folderId/update-folder",
  workfolderControllers.updatedWorkfolder
);
router.get("/:workbucketId/folders", workfolderControllers.getWorkfolders);
router.get(
  "/:workbucketId/folders-and-todos",
  workfolderControllers.getWorkfoldersWithTodo
);
router.put(
  "/:folderId/updated-folder-title",
  workfolderControllers.updatedWorkfolderTitle
);
router.delete(
  "/:folderId/delete-folder",
  workfolderControllers.deleteWorkfolder
);

module.exports = router;
