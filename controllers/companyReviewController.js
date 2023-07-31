const companyReviewSchema = require("../models/companyReviewSchema");

const createReview = async (req, res) => {
  const reviewData = new companyReviewSchema(req.body);
  try {
    await reviewData.save();
    res.status(200).json({
      success: true,
      message: "Review added successfully",
      reviewData: reviewData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

let updateReview = async (req, res) => {
  //let id = req.params.id
  try {
    let updateData = await companyReviewSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Employee review updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

let deleteReview = async (req, res) => {
  //let id = req.params.id
  try {
    let deleteData = await companyReviewSchema.findByIdAndDelete(req.params.id);
    res.status(201).send({
      success: true,
      message: "review delete successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
