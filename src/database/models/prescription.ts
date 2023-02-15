'use strict';

import { Model, UUIDV4 } from 'sequelize';


interface PrescriptionAttributes {
  prescription_id: string;
  user_id: string;
  drug_name: string;
  dose: number;
  end_date: string;
  status: string[];
  unit: string[];
  first_timer: string;
  second_timer: string;
  third_timer: string;
}


module.exports = (sequelize:any, DataTypes:any) => {
  class Prescription extends Model <PrescriptionAttributes>{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    declare prescription_id: string;
    declare  user_id: string;
    declare  drug_name: string;
    declare  dose: number;
    declare  end_date: string;
    declare  status: string[];
    declare  unit: string[];
    declare  first_timer: string;
    declare  second_timer: string;
    declare  third_timer: string;

    static associate(models:any) {
      // define association here
      Prescription.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
      })
    }
  }
  Prescription.init({
    prescription_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        key: 'user_id',
        model: 'User',
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
