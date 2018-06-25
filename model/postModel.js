
const sequilize = require('../db'),
Sequelize = require('sequelize')

const profile = sequilize.define('posts',{
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
profileId: Sequelize.INTEGER,
content: Sequelize.TEXT,
imageLink: Sequelize.STRING,
removedAt: Sequelize.DATE,
updatedAt: Sequelize.DATE,
createdAt: Sequelize.DATE
})

module.exports = profile;