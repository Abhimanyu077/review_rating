const joi = require("joi");

const companyValSchema = {
  registerCompany: joi
    .object({
      companyName: joi
        .string()
        .min(3)
        .max(20)
        .message({
          "String.max": "{#label} should contains at least {#limit} characters",
          "String.min": "{#label} should contains at least {#limit} characters",
        })
        .required(),
      companyCity: joi.string().required(),
      companyLocation: joi.string().required(),
    })
    .unknown(true),
};
module.exports = companyValSchema;
