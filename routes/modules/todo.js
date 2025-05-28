const express = require("express");
const router = express.Router();
const todoControllers = require("../../controllers/todo-controllers");

router.delete("/:workfolderId/:todoId/delete-todo", todoControllers.deleteTodo);

// router.put(
//   "/:sourceFolderId/:targetFolderId/:todoId/updated-position",
//   todoControllers.updatedTodoPosition
// );

router.patch(
  "/:folderId/updated-position",
  todoControllers.updatedTodoPosition
)
router.patch("/:todoId/relocate-todo", todoControllers.relocatedTodoPosition)
router.get("/:workfolderId/folder-todos", todoControllers.getTodos);
router.get("/:todoId/todo-item", todoControllers.getTodo);
router.post("/:workfolderId/create-todo", todoControllers.createTodo);

router.put("/:todoId/update-todo", todoControllers.editTodo);

module.exports = router;
