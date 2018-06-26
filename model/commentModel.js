
const sequilize = require('../db'),
Sequelize = require('sequelize')

const comment = sequilize.define('comments',{
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
profileId: Sequelize.INTEGER,
postId: Sequelize.INTEGER,
content: Sequelize.TEXT,
removedAt: Sequelize.DATE,
updatedAt: Sequelize.DATE,
createdAt: Sequelize.DATE
})

module.exports = comment;