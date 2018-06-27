const db = require('../../db'),
    util = require('../../util')
 

exports.addPost = (req,res)=>{
    //body object format needed and then checks required
    console.log(req.file);
    req.body.imageLink = req.file ? req.file.filename : '';
    let postDBObj = fetchPostDBObj(req.body);

    if(!postDBObj.profileId)
        return res.status(400).send({success:false,data: false}); //just for begining: make sure all data is present in inserting object

    postModel.create(postDBObj)
    .then(post => {
        res.status(200).send({success:true,data: post})
    })
    .catch(err => { 
        util.errorHandler(err,req,res)
    })
    
};

exports.getpost = (req,res)=>{
    let postID = req.params.id;
    let resultData = {success: false,data:{}}; 
    if(!parseInt(postID,10))
        return res.status(400).send(resultData)

    postModel.findById(postID)
    .then(post =>{
        if(!post)
            throw new Error('content not found');
        
        resultData.data.post = post;
        //return commentController.getComments(post.id);
        //write logic here
    })
    .then(comments => {
        if(!comments)
            throw new Error('content not found');
        
        resultData.success = true;
        resultData.data.comments = comments;
        return res.status(200).send(resultData);
    })
    .catch(err => { 
        util.errorHandler(err,req,res)
    });  
};

exports.getAllPost = (req,res)=>{
    db.profile.findAll({
        include: [
        {
            model: db.post,
            include: [
            {
                model: db.comment
            }
            ]
        }
        ]
    }).then(profile => {
        const resObj = profile.map(profile => {

        //tidy up the profile data
        return Object.assign(
            {},
            {
                firstName: profile.firstName,
                lastName:profile.lastName,
                country: profile.country,
                imageLink: profile.image,
                
                posts: profile.posts.map(post => {

                    //tidy up the post data
                    return Object.assign(
                    {},
                    {
                        content: post.content,
                        imageLink: post.imageLink,
                        createdAt: post.createdAt,
                        numberOfComments: post.comments.length,
                    }
                    )
                })
            }
        )
        });
        res.json(resObj)
    });
};

exports.updatePost = (req,res)=>{
    let postID = req.params.id; 
    if(!parseInt(postID,10))
        return res.status(400).send({success:true,data:false});

    postDBObj = fetchPostDBObj(req.body);
    console.log(postDBObj)
    postModel.update(postDBObj,{ where: { id: postID }})
    .spread((affectedCount, affectedRows) => {
        // affectedRows will only be defined in dialects which support returning: true
        if(!affectedCount)
            res.status(400).send({success:false, data:affectedCount});
        res.status(200).send({data:affectedCount});
    }).catch(err => { 
        util.errorHandler(err,req,res)
    })  
};

exports.deletePost = (req,res)=>{
    let postID = req.params.id;
    if(!parseInt(postID,10))
        return res.status(400).send({success:false,data:false});

    postModel.destroy({where:{'id':postID}}).then(rowAffected =>{
        if(!affectedCount)
            res.status(400).send({success:false,data:false})
        res.status(200).send({success:true,data: rowAffected}); 
    })
    .catch(err => { 
        util.errorHandler(err,req,res)
    })
};


function fetchPostDBObj(post){
    return dbObj = {
            profileId: post.profileId,
            content: post.content,
            imageLink: post.imageLink
        }
}
