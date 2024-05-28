const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('3700barber', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
});

module.exports = sequelize;
