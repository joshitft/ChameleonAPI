
const userModel = require('../../db').profile,
    authModel = require('../../db').auth,
    async = require('async'),
    AuthenticateResult = require('../../authenticate/Result'),
    util = require('../../util');


exports.addProfileData = (req,res)=> {
    //body object format needed and then checks required
    let response;
    if (req.isUserPresent)
        util.sendResponse.call(this,201,{mesage: 'USER is already added ',user : req.isUserPresent},res);
    else {
        let userDBObj = fetchUserDBObj(req.user['https://tft']);
        if (!userDBObj.authId)
            return res.status(400).send({success: false, data: false, message: 'User id is not present'});

        async.waterfall([
            function (done) {
                userModel.create(userDBObj).then(user => done(null, user)).catch(err => done(err, null))
            },
            function (user, done) {
                if (!user) done({message: 'Cant able to add user in profile table'}, null);
                else authModel.create({
                    id: userDBObj.authId,
                    profileId: user.id
                }).then(user_membership => done(null, user_membership['profile']=user)).catch(err => done(err, null))
            }
        ], (err, user) => {
            if (err || !user)
                util.errorHandler.call(this, 404, {message: 'Error in creating user membership', error: err}, res)
            else
                util.sendResponse.call(this, 201, user, res)
        });
    }
};

exports.getUser = (req,res)=>{
    let userID = req.params.id; 
    if(!parseInt(userID,10))
        return res.status(400).send({success:false,data:false})

    userModel.findById(userID).then(user =>{
        if(!user) util.errorHandler.call(this,404,{message : 'User is not present'}, res)
        util.sendResponse.call(this,200,user,res)
    })
    .catch(err => { 
        util.errorHandler(err,req,res)
    })  
}

exports.updateUser = (req,res)=>{
    let userID = req.params.id; 
    if(!parseInt(userID,10))
        return res.status(400).send({success:false,data:false})

    userDBObj = fetchUserDBObj(req.body);
    userModel.update(userDBObj,{ where: { id: userID }})
    .spread((affectedCount, affectedRows) => {
        // affectedRows will only be defined in dialects which support returning: true
        if(!affectedCount)
            res.status(400).send({success:false,data:false})
        res.status(200).send({success:true,data:affectedCount});
    }).catch(err => { 
        util.errorHandler(err,req,res)
    })    
}

exports.deleteUser = (req,res)=>{
    let userID = req.params.id;
    if(!parseInt(userID,10))
        return res.status(400).send({success:false,data:false})

    userModel.destroy({where:{'id':userID}}).then(rowAffected =>{
        if(!rowAffected)
            res.status(200).send({success:false,data: false});
        res.status(200).send({success:true,data: rowAffected});
            
    })
    .catch(err => { 
        console.log(err);
        res.status(500).send({success:false,data: false})
    })
}


function fetchUserDBObj(user){
    return dbObj = {
        authId : user._id,
        email: user.email,
        alias: user.name,
        firstName: user.given_name,
        lastName: user.family_name,
        gender: user.gender || undefined,
        picture : user.picture,
        nickname : user.nickname,
        provider : user.identities.provider,
        created_at : user.created_at,
        updated_at : user.updated_at,
        user_auth_id : user.identities.user_id,
        cellularNumber: user.cellularNumber,
        country: user.country,
        city: user.city,
        zipCode: user.zipCode,
        industry: user.industry,
        currentPosition: user.currentPosition
    }
}