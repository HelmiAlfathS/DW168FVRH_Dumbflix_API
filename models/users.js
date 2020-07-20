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
      subscribe: { type: DataTypes.BOOLEAN, defaultValue: false },
      role: DataTypes.INTEGER,
    },
    {}
  );
  Users.associate = function (models) {
    Users.hasMany(models.Transaction);
  };
  return Users;
};
