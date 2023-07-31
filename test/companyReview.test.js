let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");

chai.should();
chai.use(chaiHttp);

//        <----------- Create Review Test ------------->

describe("Update /api/review", () => {
  it("It should update previous review", (done) => {
    const data = {
      companyReviewsubject: "It's a good institute for learning ",
      companyReview: "nicegood",
      companyRating: "2",
      userId: "64bd6c06421727efd1298a06",
      companyId: "64bd6c56d63fc6676b559338",
    };
    chai
      .request(server)
      .post("/review/create")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.a("object");
        res.should.have.property("success").eq(true);
        res.should.have.property("message").eq("Review added successfully");
      });
  });
});

//          <------------- Update review ----------->
// describe('UPDATE /api/review', () => {
//     it('It should update previous review', (done) => {
//         const data = {
//             companyReview: "It's a good institute for learning backend and frontend programming.",
//         };
//         chai
//             .request(server)
//             .patch('/review/update/64bd6c06421727efd1298a06')
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(202);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('success').eq(true);
//                 res.body.should.have.property('message').eq('Review update successfully');
//             })
//         done();
//     })
//     it('It should return message', (done) => {
//         const data = {
//             companyReview: "It's a good institute for learning backend and frontend programming.",
//         };
//         chai
//             .request(server)
//             .patch('/review/update/64bd6c06421727efd1298a06')
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(404);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('success').eq(false);
//                 res.body.should.have.property('message').eq('Review is not found');
//             })
//         done();
//     })
// })
//                <-----------Delete Test---------->
// describe('DELETE /api/review', () => {
//     it('It should delete the review', (done) => {
//         chai
//             .request(server)
//             .delete('/review/delete/64bd6c06421727efd1298a06')
//             .end((err, res) => {
//                 res.should.have.status(202);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('success').eq(true);
//                 res.body.should.have.property('message').eq('Review deleted successfully');
//             })
//         done();
//     })
// })
