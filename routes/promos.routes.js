const express = require("express");
const router = express.Router();
const promosController = require("../controllers/promos.controller");
const validators = require("../validators/promos");

router.get("/", async (request, response) => {
  const data = await promosController.getAllPromo();
  response.status(200).json(data);
});

router.get("/rechercher", async (request, response) => {
  const query = request.query;
  const resultat = await promosController.rechercher(query);
  response.status(200).json(resultat);
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const data = await promosController.getPromo(id);
  response.status(200).json({ data });
});

router.post(
  "/ajouter",
  wrapAsync(async (request, response, next) => {
    const { titre, iteration } = request.body;

    validators.titre(titre, response);
    validators.iteration(iteration, response);

    const nouvellePromo = await promosController.addPromo({ titre, iteration });

    response.status(201).json({
      data: {
        titre: nouvellePromo.titre,
        iteration: nouvellePromo.iteration
      }
    });
  })
);

router.delete("/supprimer/:id", async (request, response) => {
  const { id } = request.params;
  await promosController.deletePromo(id);
  response.json().status(204);
});
router.put("/modifier/:id", async (request, response) => {
  const { id } = request.params;
  const data = request.body;
  const updateData = await promosController.updatePromo(id, data);
  response.status(200).json(updateData);
});

router.post("/:id/apprenants/ajouter", async (request, response) => {
  const data = request.body;
  const promoId = request.params.id;

  const nouvelApprenant = await promosController.addApprenantDansPromo(
    promoId,
    data
  );

  response.status(201).json({
    data: {
      nom: nouvelApprenant.nom,
      prenom: nouvelApprenant.prenom
    }
  });
});

module.exports = router;

function wrapAsync(fn) {
  return function(request, response, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(request, response, next).catch(next);
  };
}
