
module.exports = (sequelize, DataTypes) => {
    const profile = sequelize.define('profiles', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        authId: DataTypes.STRING,
        name: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        gender: DataTypes.STRING,
        email: {type: DataTypes.STRING, unique: true},
        cellularNumber: DataTypes.STRING,
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        zipCode: DataTypes.STRING,
        industry: DataTypes.STRING,
        currentPosition: DataTypes.STRING,
        removedAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE,

        picture: DataTypes.STRING,
        nickname: DataTypes.STRING,
        provider: DataTypes.STRING,
        userAuthId: DataTypes.STRING,

    }, {
        instanceMethods: {
            loginUserInfo: function () {
                return {
                    id: this.id,
                    name: this.alias,
                }
            }
        }
    })
    return profile;
}
