
const userModel = require('../../db').profile,
    util = require('../../util')


exports.addProfileData = (req,res)=>{
    //body object format needed and then checks required
    let userDBObj = fetchUserDBObj(req.body);

    if(!userDBObj.alias)
        return res.status(400).send({success:false,data: false}); //just for begining: make sure all data is present in inserting object

    userModel.create(userDBObj)
    .then(user => {
        if(!user)
            throw new Error('content not found');
        res.status(200).send({success:true,data: user}) 
    })
    .catch(err => { 
        util.errorHandler(err,req,res)
    })
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
            alias: user.alias,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            email: user.email,
            cellularNumber: user.cellularNumber,
            country: user.country,
            city: user.city,
            zipCode: user.zipCode,
            industry: user.industry,
            currentPosition: user.currentPosition
        }
}