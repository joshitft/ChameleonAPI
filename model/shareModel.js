
module.exports = (sequelize, DataTypes) => { 
    const shares = sequelize.define('shares',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        profileId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
        removedAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE
        })
    return shares;
    }