if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const User = require("../models/user-models");
const { getRandomColor } = require("../helpers/color-helper");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    const users = await User.find(); // Fetch all users

    for (const user of users) {
      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            bgColor: getRandomColor(),
            textColor: getRandomColor(),
          },
        }
      );
    }

    console.log("Updated existing users with bgColor and textColor.");
    await mongoose.disconnect();
  })
  .catch((err) => console.error("MongoDB Error!", err.message));
