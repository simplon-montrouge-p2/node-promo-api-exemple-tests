const _ = require('lodash');

module.exports = {
    titre: (titre, response) => {
        if (_.isNil(titre)) {
            response.status(400)
                .json({ error: 'le titre doit etre renseigné' });
        }

        if (typeof titre !== 'string') {
            response.status(400)
                .json({ error: 'le titre doit etre une chaine de caracteres' });
        }

        if (titre.length > 30) {
            response.status(400)
                .json({ error: 'le titre doit etre inferieure à 30 caracteres' });
        }
    },
    iteration: (iteration, response) => {
        if (_.isNil(iteration)) {
            response.status(400)
                .json({ error: 'l\'itération doit etre renseigné' });
        }

        if (typeof iteration !== 'number') {
            response.status(400)
                .json({ error: 'l\'itération doit etre un nombre' });
        }
        if (!Number.isInteger(iteration)) {
            response.status(400)
                .json({ error: 'l\'itération doit etre un nombre entier' });
        }

        if (iteration <= 0) {
            throw Error(400, 'l\'itération doit superieur a 0');
            // response.status(400)
            // .json({ error: 'l\'itération doit superieur a 0' });
        }
    }
}
