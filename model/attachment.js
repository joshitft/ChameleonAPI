
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('attachment',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fileType: DataTypes.STRING,
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