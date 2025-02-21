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
  updatedTodoPosition: async (req, res) => {
    try {
      const { todoId } = req.params;

      const { folderId, newOrder, oldOrder } = req.body; // target folderId and target Order

      const todo = await Todo.findById(todoId);

      if (!todo)
        return res.status(404).json({
          success: false,
          message: "Todo no found",
        });
      const workfolderId = todo.workfolderId;

      // Option1 ---> same folder, folderId: null
      if (!folderId) {
        const todos = await Todo.find({
          workfolderId,
        }).sort({ order: 1 });

        // Remove the todo and insert it at the new position
        todos.splice(newOrder, 0, todos.splice(oldOrder, 1)[0]);

        // Create bulk update operations to minimize DB calls
        const bulkOps = todos.map((t, index) => ({
          updateOne: {
            filter: { _id: t._id },
            update: { $set: { order: index } },
          },
        }));

        if (bulkOps.length > 0) {
          await Todo.bulkWrite(bulkOps);
        }

        return res.status(200).json({
          success: true,
          data: todos,
        });
      } else {
        // Option2 ---> different folder
        // handle original folder
        const originalTodos = await Todo.find({
          workfolderId,
        }).sort({ order: 1 });

        originalTodos.splice(oldOrder, 1);

        // handle target folder
        const targetTodos = await Todo.find({
          workfolderId: folderId,
        }).sort({ order: 1 });

        todo.workfolderId = folderId;
        targetTodos.splice(newOrder, 0, todo);

        // updated both original and target folder
        const originalBulkOps = originalTodos.map((t, index) => ({
          updateOne: {
            filter: { _id: t._id },
            update: {
              $set: { order: index },
            },
          },
        }));

        const targetBulkOps = targetTodos.map((t, index) => ({
          updateOne: {
            filter: { _id: t._id },
            update: {
              $set: { order: index },
            },
          },
        }));

        await Promise.all([
          originalBulkOps.length > 0
            ? Todo.bulkWrite(originalBulkOps)
            : Promise.resolve(),
          targetBulkOps.length > 0
            ? Todo.bulkWrite(targetBulkOps)
            : Promise.resolve(),
        ]);

        await todo.save();

        // return both original and target folder
        return res.status(200).json({
          success: true,
          data: {
            originalTodos,
            targetTodos,
          },
        });
      }
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
