const express = require("express");
const router = express.Router();

const { workspaceAuthenticated } = require("../../middleware/api-auth");
const workspaceControllers = require("../../controllers/workspace-controllers");

// NON
router.delete(
  "/:workspaceAccount/:memberId/remove-member",
  // workspaceAuthenticated,
  workspaceControllers.removeWorkspaceMember
);

// V
router.post(
  "/:workspaceAccount/:memberId/admin/add-admin",
  // workspaceAuthenticated,
  workspaceControllers.setWorkspaceMemberAsAdmin
);

// V
router.delete(
  "/:workspaceAccount/:memberId/admin/remove-admin",
  // workspaceAuthenticated,
  workspaceControllers.removeWorkspaceMemberAsAdmin
);
router.get(
  "/:workspaceAccount/checked-worksapce-auth",
  workspaceControllers.checkedWorkspaceAuthentication
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
  "/:workspaceAccount/members",
  // workspaceAuthenticated,
  workspaceControllers.getWorkspaceMemberlists
);
// V
router.put(
  "/:workspaceAccount/invite-member",
  // workspaceAuthenticated,
  workspaceControllers.invitedWorkspaceMember
);

router.put(
  "/:workspaceAccount/cancel-invite",
  // workspaceAuthenticated,
  workspaceControllers.canceledInvitedWorkspaceMember
);

module.exports = router;
