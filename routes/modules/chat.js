const express = require("express");
const router = express.Router();
const { workspaceAuthenticated } = require("../../middleware/api-auth");
const chatControllers = require("../../controllers/chat-controllers");

router.get("/:workspaceAccount/chat", chatControllers.getChat);
router.get("/:workspaceAccount/messages", chatControllers.getChatWithMessage);
router.get("/:workspaceAccount/members", chatControllers.getChatMembers);
router.post("/:workspaceAccount/send-message", chatControllers.createMessages);

module.exports = router;
