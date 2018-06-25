
const userModel = require('../../model/profileModel'),
    util = require('../../util')


exports.addProfileData = (req,res)=>{
    //body object format needed and then checks required
    let userDBObj = fetchUserDBObj(req.body);

    if(!userDBObj.alias)
        return res.status(400).send({data: false}); //just for begining: make sure all data is present in inserting object

    userModel.create(userDBObj)
    .then(user => {
        res.status(200).send({data: user}) // problem HERE
    })
    .catch(err => { 
        console.log(err);
        res.status(500).send({data: false})
    })
}

exports.getUser = (req,res)=>{
    let userID = req.params.id; 
    if(!parseInt(userID,10))
        return res.status(400).send({data:false})

    userModel.findById(userID).then(user =>{
        if(user)
            res.status(200).send({data: user});
        else
            res.status(200).send({data: false});
    })
    .catch(err => { 
        console.log(err);
        res.status(500).send({data: false});
    })  
}

exports.updateUser = (req,res)=>{
    let userID = req.params.id; 
    if(!parseInt(userID,10))
        return res.status(400).send({data:false});

    userDBObj = fetchUserDBObj(req.body);
    userModel.update(userDBObj,{ where: { id: userID }})
    .spread((affectedCount, affectedRows) => {
        // affectedRows will only be defined in dialects which support returning: true
        res.status(200).send({data:affectedCount});
    }).catch(err => { 
        console.log(err);
        res.status(500).send({data: false})
    })    
}

exports.deleteUser = (req,res)=>{
    let userID = req.params.id;
    if(!parseInt(userID,10))
        return res.status(400).send({data:false});

    userModel.destroy({where:{'id':userID}}).then(rowAffected =>{
        if(rowAffected)
            res.status(200).send({data: rowAffected});
        else
            res.status(200).send({data: false});
    })
    .catch(err => { 
        console.log(err);
        res.status(500).send({data: false})
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