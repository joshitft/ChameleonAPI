
const sequilize = require('../db'),
    Sequelize = require('sequelize')

const followings = sequilize.define('followings',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    following: Sequelize.INTEGER,
    follower: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
})

module.exports = followings;