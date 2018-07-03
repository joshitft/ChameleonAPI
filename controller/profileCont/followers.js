const db = require('../../db'),
    util = require('../../util')

exports.getFollowers = (req,res)=>{
    const id = req.params.id;
    db.following.findAll({
        where: {
            following: id,
        }
    })
        .then(data => util.sendResponse.call(this,200,data,res))
        .catch(err=> {
            util.errorHandler.call(this,422,{message:`Error`,err},res)
        })
    };

exports.getFollowings = (req,res)=>{
    const id = req.params.id;
    db.following.findAll({
        where: {
            follower: id
        }
    })
        .then(data => util.sendResponse.call(this,200,data,res))
        .catch(err=> {
            util.errorHandler.call(this,422,{message:`Error`,err},res)
        })
    };

exports.addFollower = (req,res)=>{
    const currUser = req.isUserPresent.profileId;
    const toFollow = req.body.toFollow;

    if(!currUser) return util.errorHandler.call(this,422,{message:'User is not present in token'},res);
    if(!toFollow) return util.errorHandler.call(this,422,{message:'User to follow is not  present in parameters'},res);
    if(toFollow == currUser) return util.errorHandler.call(this,422,{message:`Can't follow yourself`},res)

    db.profile.findOne({
        where: {
            id : toFollow
        }
    }).then(user => {
        if (user){
            db.following.findOrCreate({
                where: {
                    follower: currUser,
                    following: toFollow
                }
            })
                .then(data => {
                    util.sendResponse.call(this,200,data,res)
                })
                .catch(err=> {
                    util.errorHandler(err,req,res)
                })
        }else{
            util.errorHandler.call(this,422,{message:`The user to follow with ID ${toFollow} doesn't exist`},res)
        }
    }).catch(err => util.errorHandler(err,req,res))
    };