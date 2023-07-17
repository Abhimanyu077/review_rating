const companyValSchema = require("../company/companyValSchema");
const { unlinkSync } = require("fs");
module.exports = {
  registerCompanyValidation: async (req, res, next) => {
    const value = await companyValSchema.registerCompany.validate(req.body, {
      abortEarly: false,
    });

    if (value.error) {
      req.file ? unlinkSync(req.file.path) : null;
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
