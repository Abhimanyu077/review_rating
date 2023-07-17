const bcrypt = require("bcrypt");
const { unlinkSync } = require("fs");
const jwt = require("jsonwebtoken");

const { transporter } = require("../service/emailService");
let userSchema = require("../models/userSchema");

//             ------>SIGN UP<-------

let createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  console.log(req.body);
  let userData = new userSchema(req.body);
  try {
    const isUserExist = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExist) {
      req.file ? unlinkSync(req.file.path) : null;
      res.status(401).send({
        success: false,
        message: "User is already registered with this email",
      });
    } else {
      // const hashPassword = await bcrypt.hash(req.body.userPassword, 10);
      // userData.userPassword = hashPassword;
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt); // **********
      const filePath = `/uploads/user${req.file.filename}`;
      userData.profilePic = filePath;
      //  <-------------->  TRIM  <---------------->
      userData.userName = req.body.userName
        .trim()
        .split(" ")
        .map((data) => {
          return data.charAt(0).toUpperCase() + data.slice(1);
        })
        .join(" ");
      const user = await userData.save();
      res.status(201).send({
        success: true,
        message: "user successfully registered",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

//           ---------> LOGIN  ----------->
let userLogin = async (req, res) => {
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: "login Successfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or Password",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "user is not registered with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

let checktoken = (req, res) => {
  res.send("Hey , your token is valid");
};

//  FOR RESET THE PASSWORD
//  User  Send Email for reset password API

let sendUserResetPasswordEmail = async (req, res) => {
  const { userEmail } = req.body; //       *********
  try {
    const userData = await userSchema.findOne({
      userEmail: userEmail,
    });
    console.log("Email user:", userData);
    if (userData != null) {
      const secret = userData._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "20m",
      });
      const link = `http://127.0.0.1.3000/user/reset-passord/${userData._id}/${token}`;
      let info = await transporter.sendMail({
        from: "abhimanyusinghrathore27@gmail.com",
        to: "abhimanyusinghrathore27@gmail.com",
        subject: "Email for user reset password..",
        text: `<a href = ${link}>click on this for reset password`,
      });
      return res.status(201).json({
        success: true,
        message: "Email send successfully",
        token: token,
        userID: userData._id,
      });
    } else {
      res
        .status(403)
        .json({ success: false, error: "Email user is not found " });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//          ---------RESET PASSWORD API--------

let resetUserPassword = async (req, res) => {
  const { id, token } = req.params; //*********
  let { newPassword, confirmPassword } = req.body; //************
  try {
    const checkUser = await userSchema.findById(id);
    if (checkUser != null) {
      const secretKey = checkUser._id + process.env.JWT_SECRET_KEY;
      jwt.verify(token, secretKey);
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const bcryptpassword = await bcrypt.hash(confirmPassword, salt);
        await userSchema.findByIdAndUpdate(checkUser._id, {
          $set: { userPassword: bcryptpassword },
        });
        res.status(200).json({
          success: true,
          message: "password update successfully",
        });
      } else {
        res.status(403).json({
          success: false,
          error: "password and confirm password is not match",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        error: "Email user is not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = {
  createUser,
  userLogin,
  checktoken,
  sendUserResetPasswordEmail,
  resetUserPassword,
};
