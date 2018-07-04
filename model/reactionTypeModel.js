

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('reactionTypes',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
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