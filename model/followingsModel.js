
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('followings',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        following: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        follower: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    })
};