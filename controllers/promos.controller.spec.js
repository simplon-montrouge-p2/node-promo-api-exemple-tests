const { expect } = require("chai");
const sinon = require("sinon");
const uuid = require("uuid/v4");

const promoController = require("./promos.controller");
const db = require("../models");
const Promo = db.promo;

describe("Controllers :: PromoController :: Unit", () => {
  describe("#addPromo", () => {
    it("should return the right object", () => {
      // Given
      const data = {
        titre: "Montrouge DWWM",
        iteration: 2,
      };

      const createReturnObject = {
        id: 42,
        titre: "Montrouge DWWM",
        iteration: 2,
      };

      const createStub = sinon
        .stub(Promo, "create")
        .returns(createReturnObject);

      // When
      promoController.addPromo(data);

      // Then
      expect(createStub.calledOnce).to.be.true;
    });
  });
});

describe("Controllers :: PromoController :: Integration", () => {
  describe("#addPromo", () => {
    it("should return the right object", async () => {
      // Given
      const data = {
        titre: "Montreuil CDA Alternance",
        iteration: 58,
      };

      // When
      const nouvellePromo = await promoController.addPromo(data);

      // Then
      expect(nouvellePromo).to.have.property("id");
      expect(nouvellePromo).to.have.property("titre");
      expect(nouvellePromo.titre).to.equal(data.titre);
      expect(nouvellePromo).to.have.property("iteration");
      expect(nouvellePromo.iteration).to.equal(data.iteration);
  });
});
