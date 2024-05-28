const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql7710063', 'sql7710063', 'xy5hcntqka', {
  host: 'sql7.freemysqlhosting.net',
  dialect: 'mysql', 
});

module.exports = sequelize;
