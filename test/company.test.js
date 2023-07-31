// let server = require("../index");
// let chaiHttp = require("chai-http");
// var chai = require("chai");
// const companySchema = require("../models/companySchema");
// const companyRoutes = require("../routes/companyRoutes");
// var random_name = require("node-random-name");

// chai.should();
// chai.use(chaiHttp);

// describe("Test API", () => {
//   describe("POST /api/company", () => {
//     it("It should create new company", (done) => {
//       const data = {
//         companyName: random_name(),
//         companyLocation: "Vijay Nagar",
//         companyCity: "Indore",
//       };
//       chai
//         .request(server)
//         .post("/company/create")
//         .set("Content-Type", "application/x-www-form-urlencoded")
//         .field(data)
//         .attach("companyPic", "D:/DCIM/IMG20190610063532.jpg")
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.should.be.a("object");
//           res.body.should.have.property("success").eq(true);
//           res.body.should.have
//             .property("message")
//             .eq("Company created successfully");
//         });
//       done();
//     });
//     it("It return already registered :", (done) => {
//       const data = {
//         companyName: "Deepika Softude",
//         companyLocation: "Vijay Nagar",
//         companyCity: "Indore",
//       };
//       chai
//         .request(server)
//         .post("/company/create")
//         .set("Content-Type", "application/x-www-form-urlencoded")
//         .field(data)
//         .attach("companyPic", "D:/hostel picks/IMG_20220129_105121.jpg")
//         .end((err, res) => {
//           res.should.have.status(409);
//           res.should.be.a("object");
//           res.body.should.have.property("success").eq(false);
//           res.body.should.have
//             .property("message")
//             .eq("Company is already registered");
//         });
//       done();
//     });
//   });
// });

// //           <------------Company List------------>

// describe("GET /api/companyList", () => {
//   it("It should return company list found successfully :", (done) => {
//     const data = {};
//     chai
//       .request(server)
//       .get("/company/list")
//       .field(data)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have
//           .property("message")
//           .eq("All company found successfully");
//         res.body.should.have.property("count").to.be.a("number");
//         res.body.should.have.property("companies").to.be.an("array");
//       });
//     done();
//   });
// });

// //        <------------- Company Details------------->

// describe("Get/api/companiesDetails", () => {
//   it("It should return company detail :", (done) => {
//     const data = {};
//     chai
//       .request(server)
//       .get("/company/details/64b5a6b1a3809073600407e9")
//       .field(data)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have
//           .property("message")
//           .eq("All reviews are successfully fetched");
//         res.body.should.have.property("companies").to.be.an("object");
//       });
//     done();
//   });
// });

// //         <---------- Search Test--------->

// describe("Get/api/companiesSearch", () => {
//   it("It should return search results :", (done) => {
//     const data = {};
//     chai
//       .request(server)
//       .get("/company/search/companyName")
//       .field(data)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have
//           .property("message")
//           .eq("Company you searched for...");
//         res.body.should.have.property("companies").to.be.an("array");
//       });
//     done();
//   });
// });

// //    <----------Sort Api Test--------->

// describe("Get/api/companiesSort", () => {
//   it("It should return sort results :", (done) => {
//     const data = {};
//     chai
//       .request(server)
//       .get("/company/sort")
//       .field(data)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have
//           .property("message")
//           .eq("All deatiled sort  by ascending order");
//         res.body.should.have.property("companyMessage").to.be.an("array");
//       });
//     done();
//   });
// });
