'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prescription.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user_id',
        onDelete: 'CASCADE',
      })
    }
  }
  Prescription.init({
    prescription_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id',
        as: 'user_id'
      }
    },
    drug_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
    },
    dose: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM("active", "ended"),
      defaultValue: "active",
      allowNull: false,
    },
    unit: {
      type: DataTypes.ENUM("mg", "ml", "micrograms"),
      defaultValue: "mg",
      allowNull: false,
    },
    first_timer: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
    },
    second_timer: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    third_timer: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    sequelize,
    modelName: 'Prescription',
    underscored: true,
    freezeTableName: true
  });
  return Prescription;
};
