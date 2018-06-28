const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config    = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,

    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});
const db = {};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//Models/tables
db.auth = require('../model/authModel')(sequelize, Sequelize);
db.profile = require('../model/profileModel')(sequelize, Sequelize);  
db.comment = require('../model/commentModel')(sequelize, Sequelize);  
db.post = require('../model/postModel')(sequelize, Sequelize);
db.following = require('../model/followingsModel')(sequelize,Sequelize);
db.postReactions = require('../model/postReactions')(sequelize,Sequelize);

//Relations
//db.post.belongsTo(db.profile);  
db.profile.hasMany(db.post);
//db.comment.belongsTo(db.post);  
db.post.hasMany(db.comment);
//db.postReactions.belongsTo(db.post);  
db.post.hasMany(db.postReactions);


module.exports = db;  