
module.exports = (sequelize, DataTypes) => {  

    const post = sequelize.define('posts',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    profileId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    imageLink: DataTypes.STRING,
    removedAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
    })

    return post;
}