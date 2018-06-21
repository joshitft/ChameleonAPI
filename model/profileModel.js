
const sequilize = require('../db'),
    Sequelize = require('sequelize')

const profile = sequilize.define('profiles',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    alias: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    gender: Sequelize.STRING,
    email: Sequelize.STRING,
    cellularNumber: Sequelize.STRING,
    country: Sequelize.STRING,
    city: Sequelize.STRING,
    zipCode: Sequelize.STRING,
    industry: Sequelize.STRING,
    currentPosition: Sequelize.STRING,
    removedAt: Sequelize.DATE
})

module.exports = profile;