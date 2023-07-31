const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  userPhone: {
    type: Number,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  userPassword: {
    type: String,
    require: true,
  },
  userCity: {
    type: String,
    require: true,
  },
  userState: {
    type: String,
    require: true,
  },
  userRole: {
    type: Boolean,
    default: true,
  },
  profilePic: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  updateAt: {
    type: Boolean,
  },
  CreatedAt: {
    type: Boolean,
  },
});

userSchema.set("timestamps", true);
module.exports = mongoose.model("users", userSchema); //collection
