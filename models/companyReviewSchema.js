const mongoose = require("mongoose");
const companySchema = require("./companySchema");

const reviewSchema = new mongoose.Schema({
  companyReviewsubject: {
    type: String,
    require: true,
  },
  companyReview: {
    type: String,
    require: true,
    default: false,
  },
  companyRating: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    require: true,
  },
  companyId: {
    type: mongoose.Types.ObjectId,
    ref: "company",
    require: true,
  },
  isAcive: {
    type: String,
    require: true,
  },
  updateAt: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("companyReview", reviewSchema);
