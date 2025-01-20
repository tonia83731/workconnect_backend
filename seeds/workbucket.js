if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const mongoose_url = process.env.MONGODB_URL;

const Workspace = require("../models/workspace-models");
const Workbucket = require("../models/workbucket-models");

mongoose
  .connect(mongoose_url)
  .then(async () => {
    const workspaces = await Workspace.find();

    const workbucketsData = [
      {
        title: "Creative Task",
        workspaceId: workspaces[0]._id,
        isPinned: false,
      },
      {
        title: "Innovative Project",
        workspaceId: workspaces[0]._id,
        isPinned: false,
      },
      {
        title: "Dynamic Challenge",
        workspaceId: workspaces[0]._id,
        isPinned: false,
      },
      {
        title: "Proactive Goal",
        workspaceId: workspaces[0]._id,
        isPinned: false,
      },
      {
        title: "Strategic Objective",
        workspaceId: workspaces[1]._id,
        isPinned: false,
      },
      {
        title: "Efficient Assignment",
        workspaceId: workspaces[1]._id,
        isPinned: false,
      },
      {
        title: "Creative Project",
        workspaceId: workspaces[2]._id,
        isPinned: false,
      },
      {
        title: "Dynamic Assignment",
        workspaceId: workspaces[2]._id,
        isPinned: false,
      },
      {
        title: "Proactive Task",
        workspaceId: workspaces[2]._id,
        isPinned: false,
      },
      {
        title: "Strategic Challenge",
        workspaceId: workspaces[3]._id,
        isPinned: false,
      },
      {
        title: "Efficient Goal",
        workspaceId: workspaces[3]._id,
        isPinned: false,
      },
      {
        title: "Creative Objective",
        workspaceId: workspaces[4]._id,
        isPinned: false,
      },
      {
        title: "Innovative Assignment",
        workspaceId: workspaces[5]._id,
        isPinned: false,
      },
      {
        title: "Dynamic Goal",
        workspaceId: workspaces[5]._id,
        isPinned: false,
      },
      {
        title: "Proactive Challenge",
        workspaceId: workspaces[6]._id,
        isPinned: false,
      },
    ];

    await Workbucket.insertMany(workbucketsData);
    console.log("Workbucket seeds added");

    await mongoose.disconnect();
    console.log("mongodb connection closed");
  })
  .catch(async (err) => {
    console.error("mongodb error!", err.message);
    await mongoose.disconnect();
    console.log("mongodb connection closed");
  });
