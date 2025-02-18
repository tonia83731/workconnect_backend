const express = require("express");
const router = express.Router();
const { authenticated } = require("../middleware/api-auth");
const auth = require("./modules/auth");
const chat = require("./modules/chat");
const todo = require("./modules/todo");
const user = require("./modules/user");
const workspace = require("./modules/workspace");
const workbucket = require("./modules/workbucket");
const workfolder = require("./modules/workfolder");
const workspaceControllers = require("../controllers/workspace-controllers");

router.use("/chat", authenticated, chat);

router.use("/workspace", authenticated, workspace);
router.use("/workbucket", authenticated, workbucket);
router.use("/workfolder", authenticated, workfolder);
router.use("/todo", authenticated, todo);

router.use("/user", authenticated, user);
// V
router.post(
  "/create-workspace",
  authenticated,
  workspaceControllers.createWorkspace
);
router.post(
  "/checked-workspace-account",
  authenticated,
  workspaceControllers.checkedAccountExisted
);
router.use("/", auth);

module.exports = router;
