
const userModel = require('../../model/profileModel'),
    util = require('../../util')


exports.addUser = (req,res)=>{
    //body object format needed and then checks required
    let user = req.body;
   
    if(!user.alias)
        return res.status(400).send({data: false}); //just for begining

    dbObj = {
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

    userModel.create(dbObj)
    .then(result => {
        res.status(200).send({data: result})
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
        res.status(500).send({data: false})
    })
    
}

exports.updateUser = (req,res)=>{
    
}

exports.deleteUser = (req,res)=>{
    
}