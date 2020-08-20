const uuid = require("uuid/v4");
const { Op } = require("sequelize");

const db = require("../models");

const Promo = db.promo;
const Apprenant = db.apprenant;

module.exports = {
  addPromo: async (data) => {
    console.log(data);
    const { titre, iteration } = data;
    const nouvellePromo = await Promo.create(
      {
        id: uuid(),
        titre,
        iteration,
      },
      { attributes: ["id", "titre", "iteration"] }
    );
    return nouvellePromo;
  },
  rechercher: async (query) => {
    console.log(query);

    const [sortField, sortOrder] = query.sort.split(",");

    return await Promo.findAll({
      attributes: ["id", "titre", "iteration"],
      order: [[sortField, sortOrder]],
      where: {
        titre: {
          [Op.like]: query.titre,
        },
      },
      limit: query.limit,
    });
  },
  getAllPromo: async () => {
    return await Promo.findAll({
      attributes: ["id", "titre", "iteration"],
      order: [["createdAt", "ASC"]],
    });
  },
  getPromo: async (id) => {
    return await Promo.findByPk(id, {
      attributes: ["id", "titre", "iteration"],
      include: [
        {
          model: Apprenant,
          attributes: ["id", "nom", "prenom"],
        },
      ],
    });
  },
  deletePromo: async (id) => {
    const promoToDelete = await Promo.findByPk(id);
    promoToDelete.destroy();
  },
  updatePromo: async (promoId, data) => {
    const [, affectedRow] = await Promo.update(data, {
      where: { id: promoId },
      returning: true,
      plain: true,
    });
    const { id, titre, iteration } = affectedRow;
    const updatedData = { id, titre, iteration };
    return updatedData;
  },

  addApprenantDansPromo: async (promoId, data) => {
    const { nom, prenom } = data;
    const nouvelApprenant = await Apprenant.create({
      id: uuid(),
      nom,
      prenom,
      promoId,
    });
    return nouvelApprenant;
  },
};
