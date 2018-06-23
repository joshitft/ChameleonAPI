var sequelize = require('../db');
const Sequelize = require('sequelize');
const Login = sequelize.define('membership',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    removed_at: Sequelize.DATE,
    profile_id: Sequelize.INTEGER
});

module.exports = Login;