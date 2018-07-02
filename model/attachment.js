
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('attachment',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fileName: DataTypes.STRING,
        fileType: DataTypes.STRING,
        removedAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE
    })
}