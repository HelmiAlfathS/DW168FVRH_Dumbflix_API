'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      startDate: { type: DataTypes.DATEONLY, defaultValue: new Date() },
      dueDate: { type: DataTypes.DATEONLY, defaultValue: new Date() },
      userId: DataTypes.NUMBER,
      attachment: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM('approved', 'cancel', 'pending'),
        defaultValue: 'pending',
      },
    },
    {}
  );
  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Users, {
      foreignKey: 'userId',

      onDelete: 'CASCADE',
    });
  };
  return Transaction;
};
