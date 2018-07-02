
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('authLogins',{
        id: {                                           //AUTH ID
            type :DataTypes.STRING,
            primaryKey: true
        },
        profileId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        removedAt: DataTypes.DATE
    },{
        instanceMethods: {
            toJSON: function () {
                return {
                    id: this.id,
                    profileId: this.profileId,
                }
            }
        }
    })
};

