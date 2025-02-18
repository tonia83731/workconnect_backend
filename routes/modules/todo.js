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
router.get(
  "/:workfolderId/bucket-todos",
  // workspaceAuthenticated,
  todoControllers.getTodos
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
  "/:workfolderId/create-todo",
  // workspaceAuthenticated,
  todoControllers.createTodo
);
router.get(
  "/:todoId/todo-item",
  // workspaceAuthenticated,
  todoControllers.getTodo
);

module.exports = router;
