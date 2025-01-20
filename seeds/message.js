if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const mongoose_url = process.env.MONGODB_URL;

const Chat = require("../models/chat-models");
const Message = require("../models/message-models");

mongoose
  .connect(mongoose_url)
  .then(async () => {
    const chats = await Chat.find();

    const messagesData = [];

    const templates = [
      [
        "Hey! How's your project going?",
        "It's going well, just finished the initial draft!",
        "Nice! What are you working on?",
        "I'm working on a marketing plan for a new product.",
        "That sounds interesting! How's the market research coming along?",
      ],
      [
        "How's everything at work?",
        "It's been busy, juggling multiple deadlines!",
        "I get that! How do you manage the workload?",
        "I try to prioritize tasks and keep track with a to-do list.",
        "That's a good strategy. Have you been able to take any breaks?",
      ],
      [
        "Hey, are you still working on that presentation?",
        "Yes, just tweaking a few things before the meeting tomorrow.",
        "Cool! What's the topic of the presentation?",
        "It's about improving customer retention strategies.",
        "That sounds crucial! Any tips you're focusing on?",
      ],
      [
        "How's the new job going?",
        "It's been great! A lot to learn, but I'm enjoying the challenge.",
        "That's awesome! What’s the most exciting project you're working on?",
        "I'm helping with the launch of a new software product.",
        "Sounds amazing! What part of the launch are you focused on?",
      ],
      [
        "Hey, have you finished your report yet?",
        "Not yet, still compiling the data.",
        "How’s the data collection going?",
        "It's going well, but it's a lot of information to sort through.",
        "I understand! Have you thought about automating some of the processes?",
      ],
    ];

    for (let i = 0; i < chats.length; i++) {
      const chat = chats[i];
      const chatMembers = chat.members.length;

      if (chatMembers > 1) {
        const conversation =
          templates[Math.floor(Math.random() * templates.length)];
        let senderIndex = 0;

        for (let j = 0; j < 5; j++) {
          const randomSender = chats[i].members[senderIndex].userId;
          const message = {
            senderId: randomSender,
            workspaceId: chat.workspaceId,
            chatId: chat._id,
            text: conversation[j],
          };

          senderIndex = senderIndex === 0 ? 1 : 0;

          messagesData.push(message);
        }
      } else continue;
    }

    await Message.insertMany(messagesData);
    console.log("Messages inserted into the database");

    await mongoose.disconnect();
    console.log("mongodb connection closed");
  })
  .catch((err) => console.error("mongodb error!", err.message));
