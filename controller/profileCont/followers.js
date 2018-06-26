followingModel = require('../../model/followingsModel')

exports.getFollowers = (req,res)=>{
    const id = req.params.id;
    followingModel.findAll({
        where: {
            following: id
        }
    })
        .then(data => res.status(200).send({success: true,data}))
        .catch(err=> {
            console.log(err);
            res.status(500).send({success: false,data: false})
        })
    };

exports.getFollowings = (req,res)=>{
    const id = req.params.id;
    followingModel.findAll({
        where: {
            follower: id
        }
    })
        .then(data => res.status(200).send({success: true,data}))
        .catch(err=> {
            console.log(err);
            res.status(500).send({success: false,data: false})
        })
    };