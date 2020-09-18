'use strict';

const { sequelize } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.changeColumn('Users', 'role', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
      // queryInterface.removeColumn('Transactions', 'status', Sequelize.BOOLEAN),
      queryInterface.changeColumn('Transactions', 'status', {
        type: Sequelize.ENUM,
        values: ['approved', 'cancel', 'pending'],
        defaultValue: 'pending',
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
