
module.exports = (sequelize, DataTypes) => { 

    const Login = sequelize.define('membership',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        username: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        removed_at: DataTypes.DATE,
        profile_id: DataTypes.INTEGER
    });

    return Login;
}

