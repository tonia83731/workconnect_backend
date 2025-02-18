const express = require("express");
const router = express.Router();

const { workspaceAuthenticated } = require("../../middleware/api-auth");
const workbucketControllers = require("../../controllers/workbucket-controllers");

// V

router.get(
  "/:workspaceId/:bucketId/bucket-title",
  workspaceAuthenticated,
  workbucketControllers.getWorkspaceBucket
);

router.put(
  "/:bucketId/update-bucket-pinned",
  workbucketControllers.updatePinnedBucket
);
router.put(
  "/:bucketId/update-bucket",
  workbucketControllers.updatedWorkspaceBucket
);

router.delete(
  "/:bucketId/delete-bucket",
  workbucketControllers.deletedWorkspaceBucket
);

// V
router.get(
  "/:workspaceAccount/buckets",
  // workspaceAuthenticated,
  workbucketControllers.getWorkspaceBuckets
);
// V
router.post(
  "/:workspaceAccount/create-bucket",
  // workspaceAuthenticated,
  workbucketControllers.createdWorkspaceBucket
);

module.exports = router;
