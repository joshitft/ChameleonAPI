const postModel = require('../../model/postModel'),
    commentController = require('./comment')
 

exports.addPost = (req,res)=>{
    //body object format needed and then checks required
    let postDBObj = fetchPostDBObj(req.body);

    if(!postDBObj.profileId)
        return res.status(400).send({data: false}); //just for begining: make sure all data is present in inserting object

    postModel.create(postDBObj)
    .then(user => {
        res.status(200).send({data: user}) // problem HERE
    })
    .catch(err => { 
        console.log(err);
        res.status(500).send({data: false})
    })
    
};

exports.getposts = (req,res)=>{
    let postID = req.params.id;
    let resultData = {success: false,data:{}}; 
    if(!parseInt(postID,10))
        return res.status(400).send(resultData)

    postModel.findById(postID)
    .then(post =>{
        if(!post)
            throw new Error('No post found');
        
        resultData.data.post = post;
        return commentController.getComments(post.id);
    })
    .then(comments => {
        if(!comments)
            throw new Error('No comment found');
        
        resultData.success = true;
        resultData.data.comments = comments;
        return res.status(200).send(resultData);
    })
    .catch(err => { 
        console.log(err.message);
        res.status(500).send(resultData);
    });  
};

exports.updatePost = (req,res)=>{
    let postID = req.params.id; 
    if(!parseInt(postID,10))
        return res.status(400).send({data:false});

    postDBObj = fetchPostDBObj(req.body);
    console.log(postDBObj)
    postModel.update(postDBObj,{ where: { id: postID }})
    .spread((affectedCount, affectedRows) => {
        // affectedRows will only be defined in dialects which support returning: true
        res.status(200).send({data:affectedCount});
    }).catch(err => { 
        console.log(err);
        res.status(500).send({data: false})
    })  
};

exports.deletePost = (req,res)=>{
    let postID = req.params.id;
    if(!parseInt(postID,10))
        return res.status(400).send({data:false});

    postModel.destroy({where:{'id':postID}}).then(rowAffected =>{
        if(rowAffected)
            res.status(200).send({data: rowAffected});
        else
            res.status(200).send({data: false});
    })
    .catch(err => { 
        console.log(err);
        res.status(500).send({data: false})
    })
};


function fetchPostDBObj(post){
    return dbObj = {
            profileId: post.profileId,
            content: post.content,
            imageLink: post.imageLink
        }
}
