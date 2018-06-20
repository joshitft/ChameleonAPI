
const userModel = require('../../model/profileModel')


exports.addUser = (req,res)=>{
    //body object format needed

}

exports.getUser = (req,res)=>{
    let userID = req.params.id;
    
    userModel.findById(userID).then(user =>{
        res.send({data: user})
    })
    .catch(err => { 
        console.log(err);
        res.send({data: false})
    })
    
}


exports.updateUser = (req,res)=>{
    
}

exports.deleteUser = (req,res)=>{
    
}