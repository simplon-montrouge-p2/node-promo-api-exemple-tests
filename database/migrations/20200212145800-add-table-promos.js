module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
            CREATE TABLE promos (
                id UUID NOT NULL PRIMARY KEY, 
                titre VARCHAR(30) NOT NULL,
                iteration INTEGER NOT NULL,
                created_at DATE NOT NULL,
                updated_at DATE NOT NULL
                );
        `);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
        DROP TABLE promos;
      `);
  }
};
