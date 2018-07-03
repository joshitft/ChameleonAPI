
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('shares',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        profileId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        removedAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE
        }, {
        instanceMethods: {
            toJSON: function () {
                return this;
            }
        }
    })
    };