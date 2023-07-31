const { unlinkSync } = require("fs");
const userValSchema = require("./userValSchema");

module.exports = {
  registerUserValidation: async (req, res, next) => {
    const value = await userValSchema.registerUser.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      req.file ? unlinkSync(req.file.path) : null; // Delete multer unnecessary  images
      res.status(403).json;
      res.json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  
  userLoginValidation: async (req, res, next) => {
    const value = await userValSchema.loginUser.validate(req.body, {
      abort: false,
    });
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
  
  resetPasswordValidation: async (req, res, next) => {
    const value = await userValSchema.resetPassword.validate(req.body);
    if (value.error) {
      res.status(403).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
