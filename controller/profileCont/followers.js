const followingModel = require('../../db').following,
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

exports.addFollower = (req,res)=>{
    const toFollow = req.body[0].toFollow;
    const userId = req.body[0].userId;

    followingModel.findOrCreate({
        where: {
            follower: userId,
            following: toFollow
        }
    })
        .then(data => {
            res.status(200).send({success: true,data})
        })
        .catch(err=> {
            util.errorHandler(err,req,res)
        })
    };