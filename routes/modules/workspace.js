const express = require("express");
const router = express.Router();
const workspaceControllers = require("../../controllers/workspace-controllers");

router.delete(
  "/:workspaceAccount/:memberId/remove-member",
  workspaceControllers.removeWorkspaceMember
);

router.post(
  "/:workspaceAccount/:memberId/admin/add-admin",
  workspaceControllers.setWorkspaceMemberAsAdmin
);

router.delete(
  "/:workspaceAccount/:memberId/admin/remove-admin",
  workspaceControllers.removeWorkspaceMemberAsAdmin
);
router.get(
  "/:workspaceAccount/checked-worksapce-auth",
  workspaceControllers.checkedWorkspaceAuthentication
);
router.get(
  "/:workspaceAccount/workspace-info",
  workspaceControllers.getWorkspaceInfo
);

router.put(
  "/:workspaceAccount/update-workspace",
  workspaceControllers.updatedWorkspace
);

router.get(
  "/:workspaceAccount/members",
  workspaceControllers.getWorkspaceMemberlists
);

router.put(
  "/:workspaceAccount/invite-member",
  workspaceControllers.invitedWorkspaceMember
);

router.put(
  "/:workspaceAccount/cancel-invite",
  workspaceControllers.canceledInvitedWorkspaceMember
);

module.exports = router;
