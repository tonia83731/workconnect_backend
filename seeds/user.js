if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoose_url = process.env.MONGODB_URL;
const User = require("../models/user-models");

mongoose
  .connect(mongoose_url)
  .then(async () => {
    const users = [
      {
        name: "Test",
        email: "test@example.com",
        password: "12345678",
      },
      {
        name: "User1",
        email: "user1@example.com",
        password: "12345678",
      },
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "pass1234",
      },
      {
        name: "Bob Smith",
        email: "bob.smith@example.com",
        password: "secure5678",
      },
      {
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        password: "qwerty123",
      },
      // {
      //   name: "David Lee",
      //   email: "david.lee@example.com",
      //   password: "mypassword1",
      // },
      // {
      //   name: "Eva White",
      //   email: "eva.white@example.com",
      //   password: "letmein234",
      // },
      // {
      //   name: "Frank Harris",
      //   email: "frank.harris@example.com",
      //   password: "welcome567",
      // },
      // {
      //   name: "Grace Clark",
      //   email: "grace.clark@example.com",
      //   password: "password789",
      // },
      // {
      //   name: "Henry Lewis",
      //   email: "henry.lewis@example.com",
      //   password: "iloveyou123",
      // },
      // {
      //   name: "Isabel Walker",
      //   email: "isabel.walker@example.com",
      //   password: "1234abcd",
      // },
      // {
      //   name: "Jack Hall",
      //   email: "jack.hall@example.com",
      //   password: "sunshine567",
      // },
    ];

    const hashedUsers = users.map((user) => {
      const salt = bcrypt.genSaltSync(10);
      return {
        ...user,
        password: bcrypt.hashSync(user.password, salt),
      };
    });

    await User.insertMany(hashedUsers);
    console.log("user seeds added");

    await mongoose.disconnect();
    console.log("mongodb connection closed");
  })
  .catch((err) => console.error("mongodb error!", err.message));
