let authModel = require('../../model/authModel')
exports.loginCallback = (req,res)=>{
    authModel.findAll().then( res => console.log(res));
    res.send("IN")
};