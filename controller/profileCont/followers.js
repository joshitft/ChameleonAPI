followingModel = require('../../model/followingsModel')

exports.getFollowers = (req,res)=>{
    const id = req.params.id;
    followingModel.findAll({
        where: {
            following: id
        }
    }).then(data => res.json(data))
    };

exports.getFollowings = (req,res)=>{
    const id = req.params.id;
    followingModel.findAll({
        where: {
            follower: id
        }
    }).then(data => res.json(data))
    };