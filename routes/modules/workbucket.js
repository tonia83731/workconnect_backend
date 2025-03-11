const express = require("express");
const router = express.Router();
const workbucketControllers = require("../../controllers/workbucket-controllers");

router.get("/:bucketId/bucket-title", workbucketControllers.getWorkspaceBucket);

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

router.get(
  "/:workspaceAccount/buckets",
  workbucketControllers.getWorkspaceBuckets
);

router.post(
  "/:workspaceAccount/create-bucket",
  workbucketControllers.createdWorkspaceBucket
);

module.exports = router;
