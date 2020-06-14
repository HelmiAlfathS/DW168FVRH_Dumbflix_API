'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('transactions', [
      {
        startDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        userId: 1,
        attachment: 'bankx.jpg',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        startDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        userId: 6,
        attachment: 'banky.jpg',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        startDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        userId: 7,
        attachment: 'banky.jpg',
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
