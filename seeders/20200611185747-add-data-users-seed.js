'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: 'Helmi Alfath',
        email: 'helmi@gmail.com',
        password: '123456a',
        gender: 'male',
        phone: '082122223333',
        address: 'jln. ninjaku',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
