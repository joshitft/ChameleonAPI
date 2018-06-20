var sequelize = require('../db');
const Sequelize = require('sequelize');
const Login = sequelize.define('membership',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: Sequelize.STRING,
    password_hash: Sequelize.INTEGER
});

module.exports = Login;