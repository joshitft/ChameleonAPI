
const userModel = require('../../db').profile,
    authModel = require('../../db').auth,
    AuthenticateResult = require('../../authenticate/Result'),
    util = require('../../util');


exports.addProfileData = (req,res)=> {
    //body object format needed and then checks required
    console.log("==============",req.user)
    let response;
    if (!req.user || !req.user['https://tft']) {
        response = new AuthenticateResult(422, null, {'message': "User information is not found in token"});
        res.status(422)
        res.send(JSON.stringify(response));
    }
    else {
        let success = (result) => {
                if (result) {
                    res.status(201)
                    res.success = true;
                    response = new AuthenticateResult(201, result, null);

                } else {
                    res.status(422)
                    result = new AuthenticateResult(422, null, {'message': "Cant able to add user"});
                }
                res.send(JSON.stringify(result));
            },
            error = (error) => {
                res.status(404);
                response = new AuthenticateResult(404, null, error);
                res.send(JSON.stringify(response));
            },
            userDBObj = fetchUserDBObj(req.user['https://tft']);

        if (!userDBObj.authId)
            return res.status(400).send({success: false, data: false, message: 'User id is not present'});
console.log("USER OBJ::::::::::::::",userDBObj);
        authModel.findOne({
            where: {
                id: userDBObj.authId
            }
        }).then(user => {
            console.log("user is :",user)
                if (user) success.call(this,{mesage: 'USER is already added : '+user.id});
                else {
                    userModel.create(userDBObj)
                        .then(user => {
                            if (user) {
                                authModel.create({
                                    id: userDBObj.authId,
                                    profileId: user.id
                                }).then(user => {
                                    success.call(this, user)
                                }).catch(err => error.call(this, err))
                            }
                        }).catch(err => error.call(this, err));
                }
            })
            .catch(err => {
                util.errorHandler(err, req, res)
            })
    }
}

exports.getUser = (req,res)=>{
    let userID = req.params.id; 
    if(!parseInt(userID,10))
        return res.status(400).send({success:false,data:false})

    userModel.findById(userID).then(user =>{
        if(!user)
            throw new Error('content not found');
        res.status(200).send({success:true,data: user})
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