const express = require("express");
const router = express.Router();

const { workspaceAuthenticated } = require("../../middleware/api-auth");
const workspaceControllers = require("../../controllers/workspace-controllers");

// NON
router.delete(
  "/:workspaceId/:memberId/remove-member",
  workspaceAuthenticated,
  workspaceControllers.removeWorkspaceMember
);

// V
router.post(
  "/:workspaceId/:memberId/admin/add-admin",
  workspaceAuthenticated,
  workspaceControllers.setWorkspaceMemberAsAdmin
);

// V
router.delete(
  "/:workspaceId/:memberId/admin/remove-admin",
  workspaceAuthenticated,
  workspaceControllers.removeWorkspaceMemberAsAdmin
);
// V
router.put(
  "/:workspaceId/update-workspace",
  workspaceAuthenticated,
  workspaceControllers.updatedWorkspace
);
// V
// router.get(
//   "/:workspaceId/members",
//   workspaceAuthenticated,
//   workspaceControllers.getWorkspaceMemberlists
// );
// V
router.get(
  "/:workspaceId/members",
  workspaceAuthenticated,
  workspaceControllers.getWorkspaceMemberlists
);
// V
router.post(
  "/:workspaceId/invite-member",
  workspaceAuthenticated,
  workspaceControllers.invitedWorkspaceMember
);

module.exports = router;
