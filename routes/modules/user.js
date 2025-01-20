const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/user-controllers");

// V
router.post(
  "/:userId/:workspaceId/invitations-confirmed",
  userControllers.confirmWorkspaceInvitations
);
// V
router.post(
  "/:userId/:workspaceId/invitations-canceled",
  userControllers.cancelWorkspaceInvitations
);
// V
router.get("/:userId/profile", userControllers.getUserProfile);
// V
router.put("/:userId/updated-profile", userControllers.updatedUserProfile);
// V
router.get("/:userId/workspace", userControllers.getUserWorkspace);
// V
router.get("/:userId/invitations", userControllers.getWorkspaceInvitations);

router.get("/checked-authentication", userControllers.checkAuthentication);

module.exports = router;
