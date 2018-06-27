

module.exports = (sequelize, DataTypes) => { 
    const postReaction = sequelize.define('comments',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        profileId: DataTypes.INTEGER,// add reaction type ID later
        removedAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE
        })
    return postReaction;
    }