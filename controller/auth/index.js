
exports.loginCallback = (req,res)=>{
    res.send("This is the login page")
};

exports.successSignup = (req,res)=>{
    const userData = require('../../config/userRawData');
    const provider = userData[0].identities[0].provider;
    console.log(provider)
    switch (provider){
        case "google-oauth2": {
            console.log("google")
            break
        }
        case "facebook-oauth2": {
            console.log("facebook")
            break
        }
        case "auth0": {
            console.log("auth0")
            break
        }
    }
    res.send("END")
};