const { unlinkSync, accessSync } = require("fs");
let companySchema = require("../models/companySchema");
const companyReviewSchema = require("../models/companyReviewSchema");

module.exports = {
  createCompany: async (req, res) => {
    let companyData = new companySchema(req.body);
    try {
      isCompanyExist = await companySchema.findOne({
        companyName: req.body.companyName,
      });
      if (isCompanyExist) {
        req.file ? unlinkSync(req.file.path) : null;
        res.status(401).send({
          success: false,
          message: "company is already registered ",
        });
      } else {
        const filePath = `/uploads/company${req.file.filename}`;
        companyData.companyPic = filePath;
        const user = await companyData.save();
        res.status(200).json({
          success: true,
          message: "company created successfully",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `error occure ${err.message}`,
      });
    }
  },

  // -----------COMPANY LIST------------

  companyList: async (req, res) => {
    try {
      const companyList = await companySchema.find();
      const totalCompany = await companySchema.find().count();
      res.status(200).json({
        success: true,
        message: "All company found successfully ",
        count: totalCompany,
        companies: companyList,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  // Company Details

  companyDetails: async (req, res) => {
    try {
      const companyData = await companySchema.findById(req.params.id);
      const reviewData = await companyReviewSchema
        .find({ companyId: req.params.id })
        .populate({ path: "userId", select: "userName profilePic" });
      res.status(200).json({
        success: true,
        message: "All reviews are successfully uploaded",
        count: companyData,
        companies: reviewData,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Review not found ${err.message}`,
      });
    }
  },

  // search APi

  searchCompany: async (req, res) => {
    try {
      let userData = await companySchema.find({
        $or: [
          { companyName: { $regex: req.params.companyName, $options: "i" } },
        ],
      });
      res.status(200).json({
        success: true,
        message: "company you searched for...",
        companies: userData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `error in  ${error.message}`,
      });
    }
  },

  // Sort API

  sortCompany: async (req, res) => {
    try {
      let companyData = await companySchema
        .find(req.params.id)
        .sort("companyName");
      res.status(200).json({
        success: true,
        message: "All deatiled sort  by ascending order",
        companyMessage: companyData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `error in ${error.message}`,
      });
    }
  },
};
