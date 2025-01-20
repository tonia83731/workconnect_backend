const express = require("express");
const router = express.Router();
const { workspaceAuthenticated } = require("../../middleware/api-auth");
const chatControllers = require("../../controllers/chat-controllers");

// V
router.get(
  "/:workspaceId/messages",
  workspaceAuthenticated,
  chatControllers.getChatWithMessage
);
// V
// router.get(
//   "/:workspaceId/members",
//   workspaceAuthenticated,
//   chatControllers.getChatMembers
// );
// V
router.post(
  "/:workspaceId/send-message",
  workspaceAuthenticated,
  chatControllers.createMessages
);

module.exports = router;
