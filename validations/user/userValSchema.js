const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const userValSchema = {
  registerUser: joi
    .object({
      userName: joi
        .string()
        .min(3)
        .max(20)
        .message({
          "String.max": "{#label} should contains at least {#limit} characters",
          "String.min": "{#label} should contains at least {#limit} characters",
        })
        .required(),
      userEmail: joi
        .string()
        .email()
        .message("invalid email address")
        .required(),
      userPhone: joi
        .number()
        .integer()
        .min(100000000)
        .max(999999999)
        .message("invalid mobile number")
        .required(),
      userPassword: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required()
        .messages({
          "userPassword.minOfUppercase":
            "{#label} should contain at least {#min} uppercase character",
          "userPassword.minOfSpecialCharacters":
            "{#label} should contain at least {#min} special character",
          "userPassword.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
          "userPassword.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "userPassword.noWhiteSpaces":
            "{#label} should not contain white spaces",
          "userPassword.onlyLatinCharacters":
            "{#label} should contain only latin characters",
        }),
      userCity: joi.string().required(),
      userState: joi.string().required(),
    })
    .unknown(true),    

//                       LOGIN USER

  loginUser: joi.object({
    userEmail: joi.string()
      .email()
      .message("invalid email address")
      .required(),
    userPassword: joi
      .required(),    
  }),

//                        resetPassword

  resetPassword: joi.object({
    newPassword: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required()
      .messages({
        "userPassword.minOfUppercase":
          "{#label} should contain at least {#min} uppercase character",
        "userPassword.minOfSpecialCharacters":
          "{#label} should contain at least {#min} special character",
        "userPassword.minOfLowercase":
          "{#label} should contain at least {#min} lowercase character",
        "userPassword.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "userPassword.noWhiteSpaces":
          "{#label} should not contain white spaces",
        "userPassword.onlyLatinCharacters":
          "{#label} should contain only latin characters",
      }),
    confirmPassword: joiPassword
      .string()
      .messages({ "Enter password": "invalid Password" })
      .required(),
  }),
};
module.exports = userValSchema;
