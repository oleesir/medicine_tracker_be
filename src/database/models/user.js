
'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
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
      defaultValue: DataTypes.UUIDV4,
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
  },{
    hooks: {
      beforeCreate: user => User.hashPassword(user),
      beforeUpdate: user => User.hashPassword(user)
    }
  });

  User.hashPassword = async (user) => {
    const hashedPass = bcrypt.hashSync(user?.password, 10);
    return user.setDataValue('password', hashedPass);
  };


  return User;
};
