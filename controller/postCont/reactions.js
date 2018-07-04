const util = require('../../util'),
    db = require('../../db');

exports.addReactionToPost = (req,res)=>{
    const profileId = req.isUserPresent.profileId,
        postId = req.body.postId,
        reactType = req.body.reactName;
    db.post.findOne({
        where: {
            id : postId
        }
    })
        .then(post => {
            if(!post)
                throw new Error("No post found");
            return  db.reactionType.findOne({
                        where:{
                            name: reactType
                        }
                    });
        })
        .then(react => {
            if(!react)
                throw new Error("No matching reaction of type '"+reactType+"'");

            return db.postReactions.findOrCreate({
                       where: {
                           postId: postId,
                           profileId: profileId,
                           reactionTypeId: react.toJSON().id
                       }
                    });
        })
        .then( reactData => util.sendResponse.call(this,200,reactData,res))
        .catch(err => {util.errorHandler.call(this,400,{message : err.message}, res)});
};

exports.removeReactionFromPost = (req,res)=>{
    const profileId = req.isUserPresent.profileId,
        postId = req.body.postId,
        reactType = req.body.reactName;

    db.post.findOne({
        where: {
            id: postId
        }
    })
        .then(post => {
            if(!post)
                throw new Error("No post found");
            // util.sendResponse.call(this,200,react,res)
            return db.reactionType.findOne({
                        where: {
                            name: reactType
                        }
                    })
        })
        .then(type => {
            if(!type)
                throw new Error("No matching reaction of type '"+reactType+"'");
            return db.postReactions.findOrCreate({
                        where: {
                            reactTypeId: type.toJSON().id,
                            postId: postId,
                            profileId: profileId
                        }
                    })
        })
        .then(reactData => util.sendResponse.call(this,200,reactData,res))
        .catch(err => {util.errorHandler.call(this,400,{message : err.message}, res)})
};