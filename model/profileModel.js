
module.exports = (sequelize, DataTypes) => { 
    const profile = sequelize.define('profiles',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    alias: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    cellularNumber: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    industry: DataTypes.STRING,
    currentPosition: DataTypes.STRING,
    removedAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
});

return profile;
}