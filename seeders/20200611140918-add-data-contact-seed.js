'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Contacts', [
      {
        name: 'helmi alfath',
        email: 'helmi3@gmail.com',
        phone: '08577728888',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'shinta tri',
        email: 'shinta@gmail.com',
        phone: '085777277777',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Contact', null, {});
  },
};
