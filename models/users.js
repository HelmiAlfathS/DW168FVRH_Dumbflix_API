'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      subscribe: DataTypes.BOOLEAN,
    },
    {}
  );
  Users.associate = function (models) {};
  return Users;
};
