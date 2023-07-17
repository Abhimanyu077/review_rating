let express = require("express");

let company = require("../controllers/companyController");
let { upload } = require("../middlewares/companyImageStorage");
let { userAuthorization } = require("../middlewares/authToken");
const {
  registerCompanyValidation,
} = require("../validations/company/companyDatavalidation");

let companyRouter = express.Router();

companyRouter.post(
  "/create",
  upload.single("companyPic"),
  registerCompanyValidation,
  company.createCompany
);
companyRouter.get("/list", company.companyList);
companyRouter.get("/details/:id", company.companyDetails);
companyRouter.get("/search/:companyName", company.searchCompany);
companyRouter.get("/sort", company.sortCompany);
module.exports = companyRouter;
