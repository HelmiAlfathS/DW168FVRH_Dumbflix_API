'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      startDate: { type: DataTypes.DATE, defaultValue: new Date() },
      dueDate: DataTypes.DATE,
      userId: DataTypes.NUMBER,
      attachment: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {}
  );
  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return Transaction;
};
