'use strict';

import { Model, UUIDV4 } from 'sequelize';
import bcrypt from "bcryptjs";

interface UserAttributes{
  user_id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  calling_code: string;
  phone_number: string;

}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    //  */

    static associate(models:any) {
      // define association here
      User.hasMany(models.Prescription, {
        foreignKey: 'user_id',
        as: 'prescription',
        onDelete: 'CASCADE',
      });

    }
  }
  User.init({
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    calling_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    }
   }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    freezeTableName: true
  },
  );

  User.beforeCreate(async (user:any) => {
    const hashedPass = bcrypt.hashSync(user?.password, 10);
    return user.setDataValue('password', hashedPass);
  })


  return User;
};
