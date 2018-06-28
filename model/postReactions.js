

module.exports = (sequelize, DataTypes) => { 
    const postReaction = sequelize.define('postReactions',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        profileId: DataTypes.INTEGER,// add reaction type ID later
        postId: DataTypes.INTEGER,
        reactionTypeId: DataTypes.INTEGER,
        removedAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE
        })
    return postReaction;
    }