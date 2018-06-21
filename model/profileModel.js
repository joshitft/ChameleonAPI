
const sequilize = require('../db'),
    Sequelize = require('sequelize')

const user = sequilize.define('profile',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    alias: Sequelize.STRING

});

module.exports = user;