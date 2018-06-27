
module.exports = (sequelize, DataTypes) => {  
    const followings = sequelize.define('followings',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        following: DataTypes.INTEGER,
        follower: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });
    return followings;
}