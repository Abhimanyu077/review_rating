const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    require: true,
  },
  companyCity: {
    type: String,
    require: true,
    default: false,
  },
  companyLocation: {
    type: String,
    require: true,
  },
  companyPic: {
    type: String,
    require: true,
  },
  isActive: {
    type: String,
    require: true,
  },
  updateAt: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
  },
});

companySchema.set("timestamps", true);
module.exports = mongoose.model("company", companySchema);
