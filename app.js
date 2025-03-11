if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("./config/passport");
const routes = require("./routes");

const http = require("http");
const socket = require("./socket");

const app = express();
const port = process.env.PORT || 8080;

const mongoose_url = process.env.MONGODB_URL;

const allowedOrigins = [
  "http://localhost:3035", // Development
  "https://workconnect-frontend-omega.vercel.app", // Production
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

mongoose
  .connect(mongoose_url)
  .then(() => console.log("mongodb connected!"))
  .catch((err) => console.error("mongodb error!", err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(passport.initialize());
app.use("/api", routes);

const server = http.createServer(app);
socket(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
