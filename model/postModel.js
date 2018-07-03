
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('posts',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    profileId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: DataTypes.TEXT,
    attachmentId: DataTypes.INTEGER,
    removedAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
    }, {
        instanceMethods: {
            toJSON: function () {
                return this;
            }
        }
    });
};