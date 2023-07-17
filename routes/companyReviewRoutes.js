let express = require("express");

let company = require("../controllers/companyReviewController");
let {
  registerReviewValidation,
} = require("../validations/companyReview/companyDataReviewValidation");
let reviewRouter = express.Router();

reviewRouter.post("/create", registerReviewValidation, company.createReview);
reviewRouter.patch("/updatereview/:id", company.updateReview);
reviewRouter.delete("/deletereview/:id", company.deleteReview);

module.exports = reviewRouter;
