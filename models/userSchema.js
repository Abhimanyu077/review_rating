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
    type: String,
    default: true,
  },
  updateAt: {
    type: String,
    default: true,
  },
  CreatedAt: {
    type: String,
    default: true,
  },
});

userSchema.set("timestraps", true);
module.exports = mongoose.model("user", userSchema);
