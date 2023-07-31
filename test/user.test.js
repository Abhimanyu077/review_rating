// let server = require("../index");
// var chai = require("chai");
// let chaiHttp = require("chai-http");
// var randomEmail = require("random-email");
// let userRoutes = require("../routes/userRoutes");
// let userSchema = require("../models/userSchema");

// chai.should();
// chai.use(chaiHttp);
// var token;

// //                                                      <--------- Login --------> 2)

// describe("POST /api/users", () => {
//   it("IT should return login user detail :", (done) => {
//     const data = {
//       userEmail: "abhimanyusinghrathore27@gmail.com",
//       userPassword: "Abhi@123",
//     };
//     chai
//       .request(server)
//       .post("/user/login")
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have.property("message").eq("Login successfully");
//         res.body.should.have.property("accessToken");
//       });
//     done();
//   });
//   it("IT should return error message :", (done) => {
//     const data = {
//       userEmail: "abhimanyusssinghrathore27@gmail.com",
//       userPassword: "Abhi@123",
//     };
//     chai
//       .request(server)
//       .post("/user/login")
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(false);
//         res.body.should.have
//           .property("message")
//           .eq("Invalid email or password");
//       });
//     done();
//   });
//   //test Failure case
//   it("IT should return wrong email message :", (done) => {
//     const data = {
//       userEmail: "abhimanyusssinghrathore27@gmail.com",
//       userPassword: "Abhi@123",
//     };
//     chai
//       .request(server)
//       .post("/user/login")
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(403);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(false);
//         res.body.should.have
//           .property("message")
//           .eq("User is not registered with this email");
//         // res.body.should.have.property('accessToken');
//       });
//     done();
//   });
// });

// //                                                      //  <----------User create-----------> 1)

// describe("POST /api/users", () => {
//   it("IT should return created user detail :", (done) => {
//     const data = {
//       userEmail: "abhimanyusinghrathore27@gmail.com",
//       userPassword: "Abhi@123",
//       userName: "Abhimanyu",
//       userPhone: "8319781131",
//       userCity: "Ratlam",
//       userState: "M.P",
//     };
//     chai
//       .request(server)
//       .post("/user/create")
//       .set("content-Type", "application/x-www-form-urlencoded")
//       .field(data)
//       .attach("profilePic", "D:/DCIM/IMG_20191022_002151.jpg")
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have
//           .property("message")
//           .eq("User successfully registered");
//         //  res.body.should.have.property('accessToken');
//       });
//     done();
//   });

//   //                                  <-----------already registered------------>

//   it("IT should return already registered with this email detail :", (done) => {
//     const data = {
//       userEmail: "abhimanyusinghrathore27@gmail.com",
//       userPassword: "Abhi@123",
//       userName: "Abhimanyu",
//       userPhone: "8319781131",
//       userCity: "Ratlam",
//       userState: "M.P",
//     };
//     chai
//       .request(server)
//       .post("/user/create")
//       .set("content-Type", "application/x-www-form-urlencoded")
//       .field(data)
//       .attach("profilePic", "D:/DCIM/IMG_20191022_002151.jpg")
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(false);
//         res.body.should.have
//           .property("message")
//           .eq("User is already registered with this email");
//         // res.body.should.have.property('accessToken');
//       });
//     done();
//   });
// });

// //                                                        <-----------Email send successfully----------->3)

// describe("POST /api/users", () => {
//   it("IT should return send email successfully detail :", (done) => {
//     const data = {
//       userEmail: "abhimanyusinghrathore27@gmail.com",
//     };
//     chai
//       .request(server)
//       .post("/user/resetpasswordemail")
//       .send(data)
//       .set("Accept", "application/json")
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have.property("message").eq("Email send successfully");
//         res.body.should.have.property("token");
//         token = res.body.token;
//       });
//     done();
//   });
//   it("IT should return send Email user is not found detail :", (done) => {
//     const data = {
//       userEmail: "aabhimanyusinghrathore27@gmail.com",
//     };
//     chai
//       .request(server)
//       .post("/user/resetpasswordemail")
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(403);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(false);
//         res.body.should.have.property("error").eq("Email user is not found");
//       });
//     done();
//   });
// });

// //                                            <----------------reset Password-------------->4)

// describe("POST /api/users", () => {
//   it("IT should return send password update successfully detail :", (done) => {
//     const data = {
//       newPassword: "Abhi@123",
//       confirmPassword: "Abhi@123",
//     };
//     chai
//       .request(server)
//       .post(
//         "/user/resetpassword/64b93531baef34f1fb4f3aec/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGI5MzUzMWJhZWYzNGYxZmI0ZjNhZWMiLCJpYXQiOjE2ODk4NzcxMzYsImV4cCI6MTY4OTg3ODMzNn0.HukDbvi886bPDLz06-u1zAK3HqoZLRKP5qTkpGYPfKA"
//       )
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have
//           .property("message")
//           .eq("Password update successfully");
//       });
//     done();
//   });
//   it("IT should return password not match :", (done) => {
//     const data = {
//       newPassword: "Abhi@123",
//       confirmPassword: "Abhhi@123",
//     };
//     chai
//       .request(server)
//       .post(
//         "/user/resetpassword/64b93531baef34f1fb4f3aec/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGI5MzUzMWJhZWYzNGYxZmI0ZjNhZWMiLCJpYXQiOjE2ODk4NzcxMzYsImV4cCI6MTY4OTg3ODMzNn0.HukDbvi886bPDLz06-u1zAK3HqoZLRKP5qTkpGYPfKA"
//       )
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(403);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(false);
//         res.body.should.have
//           .property("message")
//           .eq("password and confirm password is not match");
//       });
//     done();
//   });
//   it("IT should return email user not found:", (done) => {
//     const data = {
//       newPassword: "Abhi@123",
//       confirmPassword: "Abhi@123",
//     };
//     chai
//       .request(server)
//       .post(
//         "/user/resetpassword/64b93531baef34f1fb4f3aec/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGI5MzUzMWJhZWYzNGYxZmI0ZjNhZWMiLCJpYXQiOjE2ODk4NzcxMzYsImV4cCI6MTY4OTg3ODMzNn0.HukDbvi886bPDLz06-u1zAK3HqoZLRKP5qTkpGYPfKA"
//       )
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(403);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have.property("message").eq("Email user is not found");
//       });
//     done();
//   });
// });
