if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const mongoose_url = process.env.MONGODB_URL;

const Workspace = require("../models/workspace-models");
const Todo = require("../models/todo-models");

mongoose
  .connect(mongoose_url)
  .then(async () => {
    const workfolderId = "67809572de546d336272cf11";
    const workspace = await Workspace.findById(workfolderId);
    const orderCount = await Todo.countDocuments({
      workfolderId,
    });

    const members = workspace.members;
    let todosData = [
      {
        workfolderId: "6780b9072452603544bd4b6f",
        title: "Review Code Changes",
        deadline: new Date("2025-01-24T23:59:59").getTime(),
        assignments: [{ userId: members[0].userId }],
      },
      {
        workfolderId: "6780b9072452603544bd4b6f",
        title: "Prepare Final Deliverables",
        deadline: new Date("2025-01-24T23:59:59").getTime(),
        assignments: [{ userId: members[1].userId }],
      },
      {
        workfolderId: "6780b9072452603544bd4b6f",
        title: "Team Meeting Preparation",
        deadline: new Date("2025-01-24T23:59:59").getTime(),
        assignments: [{ userId: members[1].userId }],
      },
      {
        workfolderId: "6780b9072452603544bd4b6f",
        title: "Finalize Budget Report",
        deadline: new Date("2025-01-24T23:59:59").getTime(),
        assignments: [
          { userId: members[0].userId },
          { userId: members[1].userId },
        ],
      },
      {
        workfolderId: "6780b9072452603544bd4b6f",
        title: "Update Client Presentation",
        deadline: new Date("2025-01-24T23:59:59").getTime(),
        assignments: [{ userId: members[0].userId }],
      },
      {
        workfolderId: "6780b9072452603544bd4b6f",
        title: "Review Design Files",
        deadline: new Date("2025-01-24T23:59:59").getTime(),
        assignments: [
          { userId: members[0].userId },
          { userId: members[1].userId },
        ],
      },
    ];

    todosData = todosData.map((todo, index) => ({
      ...todo,
      order: orderCount + index,
    }));

    await Todo.insertMany(todosData);
    console.log("Todo seeds added");

    await mongoose.disconnect();
    console.log("mongodb connection closed");
  })
  .catch(async (err) => {
    console.error("mongodb error!", err.message);
    await mongoose.disconnect();
    console.log("mongodb connection closed");
  });
