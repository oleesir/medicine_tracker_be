'use strict';

import { Model, UUIDV4 } from 'sequelize';
import bcrypt from "bcryptjs";

interface UserAttributes{
  user_id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;

}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    //  */
    declare user_id: string;
    declare first_name: string;
    declare last_name: string;
    declare password: string;
    declare email: string;

    static associate(models:any) {
      // define association here
      User.hasMany(models.Prescription, {
        foreignKey: 'user_id',
        as: 'Prescription',
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
