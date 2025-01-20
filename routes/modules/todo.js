const express = require("express");
const router = express.Router();
const { workspaceAuthenticated } = require("../../middleware/api-auth");
const todoControllers = require("../../controllers/todo-controllers");

// V
router.delete(
  "/:workspaceId/:workfolderId/:todoId/delete-todo",
  workspaceAuthenticated,
  todoControllers.deleteTodo
);
// V
router.get(
  "/:workspaceId/:todoId",
  workspaceAuthenticated,
  todoControllers.getTodo
);
// V
router.put(
  "/:workspaceId/:todoId/update-todo",
  workspaceAuthenticated,
  todoControllers.editTodo
);
// NON
router.put(
  "/:workspaceId/:todoId/positions",
  workspaceAuthenticated,
  todoControllers.updatedTodoPosition
);
// V
router.post(
  "/:workspaceId/:workfolderId/create-todo",
  workspaceAuthenticated,
  todoControllers.createTodo
);

module.exports = router;
