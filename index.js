require("dotenv").config(); //  ********
require("./config/modelConfig");
const logger = require("./utils/loggers");

const express = require("express");
const commonRouter = require("./routes/mainRoutes");
let userRouter = require("./routes/mainRoutes");
// const cron = require("node-cron");
// -----> bar bar use karne ka liya we use cron
// const { transporter, mailOption } = require("./service/emailService");
// let userRouter = require('./routes/userRouter')
// const router = require('./routes/userRouter')

const PORT = process.env.PORT || 5000;
const HOST = "localhost";

let app = express();

// let router = require("./routes/userRoutes");

app.use(express.json());

app.get("/send", async (req, res) => {
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send successfully " + info.response);
    }
  });
});

// ---->CRON JOB<-----
// cron.schedule("*/5 * * * * *", function () {
//     console.log("Running every 5 sec")
// });

app.use("/", userRouter);
app.use("/", commonRouter);

// Run the server
app.listen(PORT, () => {
  console.log(`server started ...${PORT}`);
  logger.info(`server started and running on http://${HOST}:${PORT}`);
});

// app.listen(process.env.PORT, (req, res) => {
//   console.log(`server is Running on port no : ${process.env.PORT} `);
// });
