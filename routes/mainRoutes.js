let express = require("express");
const userRouter = require("./userRoutes");
const companyRouter = require("../routes/companyRoutes");
const companyReviewRoutes = require("../routes/companyReviewRoutes");

let commonRouter = express.Router();

commonRouter.use("/user", userRouter);
commonRouter.use("/company", companyRouter);
commonRouter.use("/review", companyReviewRoutes);

module.exports = commonRouter;
