const express = require("express");
const router = express.Router();

const { workspaceAuthenticated } = require("../../middleware/api-auth");
const workbucketControllers = require("../../controllers/workbucket-controllers");

// V
router.put(
  "/:workspaceId/:bucketId/update-bucket",
  workspaceAuthenticated,
  workbucketControllers.updatedWorkspaceBucket
);
// V
router.delete(
  "/:workspaceId/:bucketId/delete-bucket",
  workspaceAuthenticated,
  workbucketControllers.deletedWorkspaceBucket
);
// V
router.get(
  "/:workspaceId/buckets",
  workspaceAuthenticated,
  workbucketControllers.getWorkspaceBuckets
);
// V
router.post(
  "/:workspaceId/create-bucket",
  workspaceAuthenticated,
  workbucketControllers.createdWorkspaceBucket
);

module.exports = router;
