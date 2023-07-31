const bcrypt = require("bcrypt");
const { unlinkSync } = require("fs");
const jwt = require("jsonwebtoken");

const { transporter } = require("../service/emailService");
let userSchema = require("../models/userSchema");

//      SIGN UP

let createUser = async (req, res) => {
  // async = the program does not wait for it to complete before moving on to the next line of code. Instead, it continues executing other parts of the program while the asynchronous task is being processed in the background.
  const salt = await bcrypt.genSalt(10);
  let userData = new userSchema(req.body);
  try {
    const isUserExist = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExist) {
      req.file ? unlinkSync(req.file.path) : null; //It delete multer unnecessary image.
      res.status(401).send({
        success: false,
        message: "User is already registered with this email",
      });
    } else {
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
      const filePath = `/uploads/user${req.file.filename}`;
      userData.profilePic = filePath;
      //  TRIM
      userData.userName = req.body.userName
        .trim()
        .split(" ") 
        .map((data) => {
          return data.charAt(0).toUpperCase() + data.slice(1);
        })
        .join(" ");
      const user = await userData.save();
      res.status(201).send({      // status code-> informs about the result of a client's request 
        success: true,
        message: "User successfully registered",
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

//         LOGIN

let userLogin = async (req, res) => {
  try {
    // Find the user in the database by their userEmail
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData) {
      // If the user is found, compare the provided password with the hashed password in the database
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        // If the passwords match, generate an access token using JWT
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: "Login successfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "User is not registered with this email",
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

//     Reset Password

let sendUserResetPasswordEmail = async (req, res) => {
  // Extract the user's email address from the request body.
  const { userEmail } = req.body;
  try {
    // Query the database to find the user data based on the provided email address.
    const userData = await userSchema.findOne({
      userEmail: userEmail,
    });
    // Check if the user data exists
    if (userData != null) {
      const secret = userData._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "20m",
      });
      // Create a reset password link that includes the user's ID and the signed token.
      const link = `http://127.0.0.1.3000/user/reset-passord/${userData._id}/${token}`;
      let info = await transporter.sendMail({
        from: "userEmail",
        to: "abhimanyusinghrathore27@gmail.com",
        subject: "Email for user reset password..",
        text: `${link}>click on this for reset password`,
      });
      return res.status(201).json({
        success: true,
        message: "Email send successfully",
        token: token,
        userID: userData._id,
      });
    } else {
      res.status(403).json({
        success: false,
        error: "Email user is not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//  RESET PASSWORD API

let resetUserPassword = async (req, res) => {
  const { id, token } = req.params;
  let { newPassword, confirmPassword } = req.body;
  try {
    // Find the user in the database based on the provided 'id'
    const checkUser = await userSchema.findById(id);
    // Check if the user exists
    if (checkUser != null) {
      // Create a secret key by combining the user's '_id' and the environment-specific secret
      const secretKey = checkUser._id + process.env.JWT_SECRET_KEY;
      jwt.verify(token, secretKey);
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        // Hash the 'confirmPassword' with the generated salt
        const bcryptpassword = await bcrypt.hash(confirmPassword, salt);
        // Update the user's password in the database with the hashed password
        await userSchema.findByIdAndUpdate(checkUser._id, {
          $set: { userPassword: bcryptpassword },
        });
        res.status(200).json({
          success: true,
          message: "Password update successfully",
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
