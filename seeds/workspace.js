if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const mongoose_url = process.env.MONGODB_URL;

const User = require("../models/user-models");
const Workspace = require("../models/workspace-models");
const Chat = require("../models/chat-models");

mongoose
  .connect(mongoose_url)
  .then(async () => {
    const users = await User.find();

    const workspacesData = [
      {
        account: "@bluemountain",
        title: "BlueMountain Collaboration",
        invites: ["test@example.com"],
        members: [
          { userId: users[9]._id, isAdmin: true },
          { userId: users[4]._id, isAdmin: false },
          { userId: users[5]._id, isAdmin: false },
        ],
      },
      {
        account: "@redocean",
        title: "RedOcean Project",
        invites: ["test@example.com", "david.lee@example.com"],
        members: [
          { userId: users[6]._id, isAdmin: true },
          { userId: users[8]._id, isAdmin: false },
        ],
      },
      {
        account: "@skyriver",
        title: "SkyRiver Solutions",
        invites: [],
        members: [
          { userId: users[4]._id, isAdmin: true },
          { userId: users[0]._id, isAdmin: false },
          { userId: users[2]._id, isAdmin: false },
        ],
      },
      {
        account: "@cloudforest",
        title: "CloudForest Innovations",
        invites: ["alice.johnson@example.com", "eva.white@example.com"],
        members: [
          { userId: users[10]._id, isAdmin: true },
          { userId: users[9]._id, isAdmin: false },
          { userId: users[6]._id, isAdmin: false },
        ],
      },
      {
        account: "@greensun",
        title: "GreenSun Ventures",
        invites: [],
        members: [
          { userId: users[3]._id, isAdmin: true },
          { userId: users[4]._id, isAdmin: false },
        ],
      },
    ];

    // await Workspace.insertMany(workspacesData);
    // console.log("workspace seeds added");

    for (const data of workspacesData) {
      const workspace = await Workspace.create(data);
      console.log(`Workspace: ${data.title} created!`);

      const chatData = {
        workspaceId: workspace._id,
        members: data.members.map((member) => ({ userId: member.userId })),
      };

      await Chat.create(chatData);
      console.log(`Chat for workspace: ${data.title} created!`);
    }

    await mongoose.disconnect();
    console.log("mongodb connection closed");
  })
  .catch((err) => console.error("mongodb error!", err.message));
