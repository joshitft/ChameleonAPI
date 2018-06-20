let authModel = require('../../model/authModel');
exports.getLoginToken = (req,res)=>{

};

exports.loginCallback = (req,res)=>{
    // authModel.findAll().then( res => console.log(res));
    // res.send("IN")
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
};