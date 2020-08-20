module.exports = (sequelize, DataTypes) => {
    const apprenant = sequelize.define("apprenant", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        nom: {
            allowNull: false,
            type: DataTypes.STRING(30)
        },
        prenom: {
            allowNull: false,
            type: DataTypes.STRING(30)
        },
        promoId: {
            field: "promo_id",
            allowNull: false,
            type: DataTypes.UUID
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

   apprenant.associate = (models) => {
        apprenant.belongsTo(models.promo);
    }

    return apprenant;
};
