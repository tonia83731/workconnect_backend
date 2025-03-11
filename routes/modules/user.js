const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/user-controllers");

router.post(
  "/:userId/:workspaceId/invitations-confirmed",
  userControllers.confirmWorkspaceInvitations
);

router.post(
  "/:userId/:workspaceId/invitations-canceled",
  userControllers.cancelWorkspaceInvitations
);

router.get("/:userId/profile", userControllers.getUserProfile);

router.put("/:userId/updated-profile", userControllers.updatedUserProfile);

router.get("/:userId/workspace", userControllers.getUserWorkspace);

router.get("/:userId/invitations", userControllers.getWorkspaceInvitations);

router.get("/checked-authentication", userControllers.checkAuthentication);

module.exports = router;
