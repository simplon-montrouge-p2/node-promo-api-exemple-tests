module.exports = (sequelize, DataTypes) => {
  const promo = sequelize.define("promo", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    titre: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
    iteration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      field: "created_at",
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      field: "updated_at",
      allowNull: false,
      type: DataTypes.DATE
    }
  });

  promo.associate = (models) => {
    promo.hasMany(models.apprenant);
  }

  return promo;
};
