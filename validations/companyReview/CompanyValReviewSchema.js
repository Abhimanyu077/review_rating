const joi = require("joi");

const CompanyValReview = {
  
  registerReview: joi
    .object({
      companyReviewsubject: joi.string().max(20).required(),

      companyReview: joi
        .string()
        .max(20)
        .message({
          "String.max": "{#label} should contains at least {#limit} characters",
        })
        .required(),
      companyRating: joi.string().required(),
    })
    .unknown(true),
};
module.exports = CompanyValReview;
