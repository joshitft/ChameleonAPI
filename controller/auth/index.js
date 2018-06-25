const userCont = require('../../controller/profile')

exports.successSignup = (req,res)=>{
    console.log("CALLBACK HIT ::::::::::::::::::::::::::::::")
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
            userCont.addProfileData(req,res);
            break
        }
    }
    res.send("END")
};