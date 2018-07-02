
const userModel = require('../../db').profile,
    authModel = require('../../db').auth,
    async = require('async'),
    AuthenticateResult = require('../../authenticate/Result'),
    util = require('../../util');


exports.addProfileData = (req,res)=> {
    //body object format needed and then checks required
    if (req.isUserPresent)
        util.sendResponse.call(this,201,{mesage: 'USER is already added ',user : req.isUserPresent},res);
    else {
        let profile,userDBObj = fetchUserDBObj(req.user['https://tft']);

        async.waterfall([
            function (done) {
                userModel.create(userDBObj).then(user => {profile = user;done(null, user)}).catch(err => done(err, null))
            },
            function (user, done) {
                if (!user) done({message: 'Cant able to add user in profile table'}, null);
                else authModel.create({
                    id: req.user['https://tft']._id,        //AUth ID
                    profileId: user.id
                }).then(user_membership => done(null,user_membership)).catch(err => done(err, null))
            }
        ], (err, user) => {
            if (err || !user)
                util.errorHandler.call(this, 404, {message: 'Error in creating user membership', error: err}, res)
            else {
                let obj = user.toJSON();
                obj.profile = profile.toJSON();
                util.sendResponse.call(this, 201, obj, res)
            }
        });
    }
};

exports.getUser = (req,res)=>{
    if(!req.isUserPresent)
        util.errorHandler.call(this, 404, {message: 'Cant find user', error: err}, res)
    else
        util.sendResponse.call(this, 201, req.isUserPresent.profile, res)
}

exports.updateUser = (req,res)=>{
    let userID = req.params.id; 
    if(!req.isUserPresent) return util.errorHandler.call(this, 404, {message: 'Cant find user', error: err}, res)

    userModel.update(req.body,{ where: { id: req.isUserPresent.profileId }})
    .spread((affectedCount, affectedRows) => {              // affectedRows will only be defined in dialects which support returning: true
        if(!affectedCount) util.errorHandler.call(this, 400, {message: 'No data found to update', error: err}, res)

        util.sendResponse.call(this, 201, {message : 'updated successfully'}, res)
    }).catch(err => {
        util.errorHandler.call(this, 404, err, res)
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