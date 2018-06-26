const commentModel = require('../../model/commentModel')
 

exports.addComment = (commentObj)=>{
    /*
        expecting comment object as:
        {
            postId: int,
            profileId: int,
            content: text 
        }
    */
    commentModel.create(commentObj)
    .then(comment => {
        return {data: comment};
    })
    .catch(err => { 
        return {data: false};
    })
    
};

exports.getComments = (postId)=>{
    
    return commentModel.findAll({
        where:{"postId":postId}
        })          
};
