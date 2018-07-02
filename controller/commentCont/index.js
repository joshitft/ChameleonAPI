const db = require('../../db'),
    util = require('../../util');
 

exports.addComment = (req,res)=>{
    /*
        expecting comment object in body as:
        {
            postId: int,
            profileId: int,
            content: text 
        }
    */
   let commentObj = req.body;
   db.comment.create(commentObj)
   .then(comment =>{
       util.sendResponse.call(this,200,comment,res)
   })
   .catch(err=>{
       util.errorHandler.call(this,400,{message : 'Error in creating comment'}, res);
   })
};

exports.getComments = (postId,attributes)=>{
    return db.comment.findAll({
        where:{"postId":postId},
        attributes: attributes
        })          
};

exports.updateComment = (req,res)=>{    
    let commentId = req.params.id; 
    if(!parseInt(commentId,10))
        return util.errorHandler.call(this,400,{message : 'invalid commentId'}, res);
    
    let commentObj = req.body;
    db.comment.update(commentObj,{ where: { id: commentId }})
    .spread((affectedCount, affectedRows) => {
        // affectedRows will only be defined in dialects which support returning: true
        if(!affectedCount)
            return util.errorHandler.call(this,400,{message : 'commentId not found'}, res);
        util.sendResponse.call(this,200,affectedCount,res);
    }).catch(err => {
        util.errorHandler.call(this,400,{message : 'Error in updating comment'}, res);
    })
};

exports.deleteComment = (req,res)=>{
    let commentId = req.params.id;
    if(!parseInt(commentId,10))
        return util.errorHandler.call(this,400,{message : 'invalid commentId'}, res);

    db.post.destroy({where:{'id':commentId}}).then(rowAffected =>{
        if(!affectedCount)
            return util.errorHandler.call(this,400,{message : 'commentId not found'}, res);
        util.sendResponse.call(this,200,affectedCount,res);
    })
    .catch(err => { 
        util.errorHandler.call(this,400,{message : 'Error in deleting comment'}, res);
    })         
};
