const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

chai.use(chaiHttp);

const server = require("../server");
const promoRouter = require("./promos.routes");
const promoController = require("../controllers/promos.controller");

describe("Routers :: promoRouter :: Functionnal", () => {
  describe("GET /promos", () => {
    it("should return the right object", (done) => {
      // const getAllPromoStub = sinon
      //   .stub(promoController, "getAllPromo")
      //   .returns({ data: [] });

      chai
        .request(server)
        .get("/promos")
        .end((error, response) => {
          // expect(getAllPromoStub.calledOnce).to.be.true;
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property("data");
          expect(response.body.data).to.be.an("array");
          // expect(response.body.data).to.have.lengthOf(0);
          done();
        });
    });
  });
});
