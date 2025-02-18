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
          select: "name",
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
        workfolderId,
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

      todo.title = title || todo.title;
      todo.status = status || todo.status;
      todo.note = note || todo.note;
      todo.deadline = deadline || todo.deadline;
      todo.checklists = checklists || todo.checklists;
      todo.assignments = assignments || todo.assignments;

      const isNewFolder =
        workfolderId && workfolderId !== todo.workfolderId.toString();

      const currFolderTodos = await Todo.find({
        workfolderId: todo.workfolderId,
      }).sort({ order: 1 });

      if (isNewFolder) {
        const newFolderTodos = await Todo.find({
          workfolderId,
        }).sort({ order: 1 });

        const updatedCurrFolderTodos = currFolderTodos
          .filter((f) => f._id.toString() !== todoId)
          .map((f, index) => ({ ...f.toObject(), order, index }));

        const currFolderOps = updatedCurrFolderTodos.map((f) => ({
          updateOne: {
            filter: { _id: f._id },
            update: { order: f.order },
          },
        }));

        await Todo.bulkWrite(currFolderOps);

        todo.workfolderId = workfolderId;
        todo.order = newFolderTodos.length;

        const updated_todo = await todo.save();

        return res.status(200).json({
          success: true,
          data: updated_todo,
        });
      }

      const updated_todo = await todo.save();

      return res.status(200).json({
        success: true,
        data: updated_todo,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updatedTodoPosition: async (req, res) => {
    try {
      const { todoId } = req.params;
      const { workfolderId, updatedOrder } = req.body;

      const todo = await Todo.findById(todoId);

      if (!todo)
        return res.status(404).json({
          success: false,
          message: "代辦事項不存在",
        });

      const isNewFolder =
        workfolderId && workfolderId !== todo.workfolderId.toString();

      const currFolderTodos = await Todo.find({
        workfolderId: todo.workfolderId,
      }).sort({ order: 1 });

      // 若todo未改變folder
      if (!isNewFolder) {
        // 其他未移動的todos
        const remainingTodos = currFolderTodos.filter(
          (todo) => todo._id !== todoId
        );

        // 更新todos順序
        const updatedTodos = [
          ...remainingTodos.slice(0, updatedOrder),
          todo,
          ...remainingTodos.slice(updatedOrder),
        ];
        updatedTodos.forEach((todo, index) => {
          todo.order = index;
        });

        // 更新Todo資料庫
        const bulkOps = updatedTodos.map((todo) => ({
          updateOne: {
            filter: { _id: todo._id },
            update: { order: todo.order },
          },
        }));

        await Todo.bulkWrite(bulkOps);
      } else {
        // todo新folder位置的所有todos
        const newFolderTodos = await Todo.find({
          workfolderId,
        }).sort({ order: 1 });

        // 更新原todo的folder --> 未移動的todos位置更新
        const updatedCurrFolderTodos = currFolderTodos
          .filter((currTodo) => currTodo._id.toString() !== todoId)
          .map((currTodo, index) => ({ ...currTodo.toObject(), order, index }));
        const currFolderOps = updatedCurrFolderTodos.map((currTodo) => ({
          updateOne: {
            filter: { _id: currTodo._id },
            update: { order: currTodo.order },
          },
        }));

        // 更新目前todo的workfolderId和order
        todo.workfolderId = workfolderId;
        todo.order = newFolderTodos.length;

        // 重新更新新folder所有todos的order
        const newUpdatedFolderTodos = [
          ...newFolderTodos.slice(0, updatedOrder),
          todo,
          ...newFolderTodos.slice(updatedOrder),
        ];
        newUpdatedFolderTodos.forEach((todo, index) => {
          todo.order = index;
        });

        const newFolderOps = newUpdatedFolderTodos.map((todo, index) => ({
          updateOne: {
            filter: { _id: todo._id },
            update: { order: index },
          },
        }));

        await Todo.bulkWrite([...currFolderOps, ...newFolderOps]);
      }

      return res.status(200).json({
        success: true,
        message: "代辦事項順序更新成功",
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

      if (title.length < 3 || title.length > 20)
        return res.status(400).json({
          success: false,
          message: "Title需介於3-20字之間",
        });

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const timestamp = today.getTime();
      if (deadline < timestamp) {
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
