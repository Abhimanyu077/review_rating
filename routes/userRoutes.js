let express = require("express");

let user = require("../controllers/userController");
let {
  registerUserValidation,
  userLoginValidation,
  resetPasswordValidation,
} = require("../validations/user/userDatavalidate");
const { userAuthentication } = require("../middlewares/authToken");
const { upload } = require("../middlewares/userImageStorage");

let router = express.Router();
router.post(
  "/create",
  upload.single("profilePic"),
  registerUserValidation,
  user.createUser
);
router.post("/login", user.userLogin);
router.get("/check", user.checktoken);
router.post("/resetpasswordemail", user.sendUserResetPasswordEmail);
router.post(
  "/resetpassword/:id/:token",
  resetPasswordValidation,
  user.resetUserPassword
);

module.exports = router;
