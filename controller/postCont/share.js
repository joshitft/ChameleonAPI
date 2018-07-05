const db = require('../../db'),
    util = require('../../util');

exports.shareAPost = (req,res)=>{
    const profileId = req.isUserPresent.profileId,
        postId = req.params.postId;
    db.post.findOne({
        where: {
            id:postId
        }
    })
        .then(post=>{
            if(!post)
                throw new Error("No matching post with this ID");
            return db.share.findOrCreate({
                where: {
                    postId,
                    profileId
                }
            })
        })
        .then(share => util.sendResponse.call(this,200,share,res))
        .catch(err=> util.errorHandler.call(this,400,{message : err.message}, res))
};

exports.unshareAPost = (req,res)=>{
    const profileId = req.isUserPresent.profileId,
        postId = req.params.postId;

    db.share.destroy({
        where:{
            profileId,
            postId}
    })
        .then(result=> util.sendResponse.call(this,200,result,res))
        .catch(err=> util.errorHandler.call(this,400,{message : err.message}, res))

};
