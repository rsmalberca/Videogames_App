const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      released: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.DECIMAL,
        validate: {
          isNumeric: true,
          min: 1.0,
          max: 5.0,
        },
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
      createdByUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
