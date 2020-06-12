const Sequelize = require('sequelize');

const sequelize = new Sequelize('dumbflix', 'root', '', {
  host: '127.0.0.1',
  dielect: 'mysql',
  operatorsAliases: false,
});

module.exports = sequelize;
global.sequelize = sequelize;
