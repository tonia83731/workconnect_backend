const Workfolder = require("../models/workfolder-models");
const Todo = require("../models/todo-models");

const todoControllers = {
  deleteTodo: async (req, res) => {
    try {
      const { workfolderId, todoId } = req.params;

      const [todos, todo] = await Promise.all([
        Todo.find({ workfolderId }).sort({ order: 1 }),
        Todo.findById(todoId),
      ]);

      if (!todo)
        return res.stats(404).json({
          success: false,
          message: "代辦事項不存在",
        });

      let isDeleteTodo = false;
      for (let todoData of todos) {
        if (isDeleteTodo) {
          todoData.order -= 1;
          await todoData.save();
        }
        if (todoData._id.toString() === todoId) {
          isDeleteTodo = true;
        }
      }

      await todo.deleteOne();

      return res.status(200).json({
        success: true,
        message: "代辦事項已刪除",
      });
    } catch (error) {
      console.log(error);
    }
  },
  getTodos: async (req, res) => {
    try {
      const { workfolderId } = req.params;
      const todos = await Todo.find({
        workfolderId,
      })
        .populate({
          path: "assignments.userId",
          select: "name bgColor textColor",
        })
        .sort({ order: -1 });

      return res.status(200).json({
        success: true,
        data: todos,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getTodo: async (req, res) => {
    try {
      const { todoId } = req.params;
      const todo = await Todo.findById(todoId).populate({
        path: "assignments.userId",
        select: "name",
      });

      if (!todo)
        return res.status(404).json({
          success: false,
          message: "代辦事項不存在",
        });

      res.status(200).json({
        success: true,
        data: todo,
      });
    } catch (error) {
      console.log(error);
    }
  },
  editTodo: async (req, res) => {
    try {
      const { todoId } = req.params;
      const {
        // workfolderId,
        title,
        status,
        note,
        deadline,
        checklists,
        assignments,
      } = req.body;

      const todo = await Todo.findById(todoId);
      if (!todo)
        return res.status(404).json({
          success: false,
          message: "代辦事項不存在",
        });

      // Update fields
      todo.title = title || todo.title;
      todo.status = status || todo.status;
      todo.note = note || todo.note;
      todo.deadline = deadline || todo.deadline;
      todo.checklists = checklists || todo.checklists;
      todo.assignments = assignments || todo.assignments;

      const data = await todo.save();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "伺服器錯誤",
        error: error.message,
      });
    }
  },
  updatedTodoVerticalPosition: async (req, res) => {
    try {
      const { workfolderId, todoId } = req.params;
      const { oldOrder, newOrder } = req.body;

      const todos = await Todo.find({
        workfolderId,
      }).sort({ order: 1 });

      const todo = await Todo.findById(todoId);

      if (!todo) {
        return res.status(404).json({
          succes: false,
          message: "Todo no found",
        });
      }

      const [movingTodo] = todos.splice(oldOrder, 1);
      todos.splice(newOrder, 0, movingTodo);

      await Promise.all(
        todos.map(async (t, index) => {
          t.order = index;
          await t.save();
        })
      );

      // console.log(todos);

      return res.status(200).json({
        success: true,
        data: todos,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updatedTodoHorizonalPosition: async (req, res) => {
    try {
      const { todoId } = req.params;

      const { oldFolderId, newFolderId, newOrder, oldOrder } = req.body; // target folderId and target Order

      const todo = await Todo.findById(todoId);

      if (!todo)
        return res.status(404).json({
          success: false,
          message: "Todo no found",
        });

      const originalTodos = await Todo.find({ workfolderId: oldFolderId }).sort(
        {
          order: 1,
        }
      );

      const [movedTodo] = originalTodos.splice(oldOrder, 1);
      movedTodo.workfolderId = newFolderId;
      await movedTodo.save();

      const targetTodos = await Todo.find({ workfolderId: newFolderId }).sort({
        order: 1,
      });
      targetTodos.splice(newOrder, 0, movedTodo);

      const originalBulkOps = originalTodos.map((t, index) => ({
        updateOne: {
          filter: { _id: t._id },
          update: { $set: { order: index } },
        },
      }));

      const targetBulkOps = targetTodos.map((t, index) => ({
        updateOne: {
          filter: { _id: t._id },
          update: { $set: { order: index } },
        },
      }));

      await Promise.all([
        originalBulkOps.length ? Todo.bulkWrite(originalBulkOps) : null,
        targetBulkOps.length ? Todo.bulkWrite(targetBulkOps) : null,
      ]);

      return res.status(200).json({
        success: true,
        data: {
          originalTodos,
          targetTodos,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  createTodo: async (req, res) => {
    try {
      const { workfolderId } = req.params;
      const { title, deadline, assignments } = req.body;

      if (!workfolderId || !title)
        return res.status(400).json({
          success: false,
          message: "請確認以下欄位是否填入: workfolderId, title",
        });

      const orderCount = await Todo.countDocuments({
        workfolderId,
      });

      if (title.length < 3 || title.length > 50)
        return res.status(400).json({
          success: false,
          message: "Title需介於3-50字之間",
        });

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const timestamp = today.getTime();
      if (deadline && deadline < timestamp) {
        return res.status(400).json({
          success: false,
          message: "Deadline不能小於今日",
        });
      }

      const data = await Todo.create({
        workfolderId,
        title,
        deadline: deadline || null,
        assignments: assignments || [],
        order: orderCount,
      });

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = todoControllers;
