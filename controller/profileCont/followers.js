const followingModel = require('../../model/followingsModel'),
    util = require('../../util')

exports.getFollowers = (req,res)=>{
    const id = req.params.id;
    followingModel.findAll({
        where: {
            following: id
        }
    })
        .then(data => res.status(200).send({success: true,data}))
        .catch(err=> {
            util.errorHandler(err,req,res)
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
            util.errorHandler(err,req,res)
        })
    };