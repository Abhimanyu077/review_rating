const companyValReview = require("../companyReview/CompanyValReviewSchema");
module.exports = {
  registerReviewValidation: async (req, res, next) => {
    const value = await companyValReview.registerReview.validate(req.body);

    if (value.error) {
      res.status(403).json;
      res.json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
