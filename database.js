const { Sequelize } = require('sequelize');
// import mysql2 from 'mysql2'

const sequelize = new Sequelize('expressdb', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql',
//   dialectModule: mysql2
});

module.exports = sequelize