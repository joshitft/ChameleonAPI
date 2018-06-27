
module.exports = (sequelize, DataTypes) => { 
    const comment = sequelize.define('comments',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        profileId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        removedAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE
        })
    return comment;
    }