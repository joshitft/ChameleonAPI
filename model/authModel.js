
module.exports = (sequelize, DataTypes) => { 

    const Login = sequelize.define('authLogins',{
        id: {                                           //AUTH ID
            type :DataTypes.STRING,
            primaryKey: true
        },
        profileId: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        removedAt: DataTypes.DATE
    });
    return Login;
};

