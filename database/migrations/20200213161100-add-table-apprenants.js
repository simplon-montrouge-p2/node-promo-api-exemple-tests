module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`
              CREATE TABLE apprenants (
                  id UUID NOT NULL PRIMARY KEY, 
                  nom VARCHAR(30) NOT NULL,
                  prenom VARCHAR(30) NOT NULL,
                  promo_id UUID NOT NULL,
                  created_at DATE NOT NULL,
                  updated_at DATE NOT NULL,
                  FOREIGN KEY(promo_id) REFERENCES promos(id) 
                  );
          `);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`
          DROP TABLE apprenants;
        `);
    }
};
