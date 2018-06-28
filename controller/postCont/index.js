const db = require('../../db'),
    util = require('../../util')
 

exports.addPost = (req,res)=>{
    //body object format needed and then checks required
    console.log(req.file);
    req.body.imageLink = req.file ? req.file.filename : '';
    let postDBObj = fetchPostDBObj(req.body);

    if(!postDBObj.profileId)
        return res.status(400).send({success:false,data: false}); //just for begining: make sure all data is present in inserting object

    db.post.create(postDBObj)
    .then(post => {
        res.status(200).send({success:true,data: post})
    })
    .catch(err => { 
        util.errorHandler(err,req,res)
    })
    
};
//update as per getAllposts
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
        res.status(200).send(resultData);
    })
    .catch(err => { 
        util.errorHandler(err,req,res)
    });  
};

exports.getAllPost = (req,res)=>{
    /*db.post.findAll({
        include: [{ model: db.post,
                    include: [{ 
                                model: db.comment
                              },
                              {
                                  model: db.postReactions
                              }
                            ],
                }]
    }).then(profile => {
        if(!profile)
            return res.status(400).send({success:false, data:false});
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
                    {},{
                        content: post.content,
                        imageLink: post.imageLink,
                        createdAt: post.createdAt,
                        numberOfComments: post.comments.length,
                        numberOfReactions: post.postReactions.length
                    })
                })
            }
        )});
        res.status(200).send({success:true, data:resObj});
    }).catch(err => { 
        util.errorHandler(err,req,res)
    })*/
    db.sequelize.query("SELECT postTable.* ,pro.firstName ,pro.lastName, pro.country, pro.city,pro.picture AS userImage FROM (SELECT y.* ,COUNT(sh.id) shCount FROM ( SELECT x.* ,COUNT(rec.id) recId FROM ( SELECT a.id ,a.content ,a.createdAt ,a.profileId AS uid,a.imageLink AS postImage,COUNT(c.content) AS 'count' FROM posts a LEFT JOIN comments c ON a.id = c.postId GROUP BY a.id ORDER BY a.createdAt DESC LIMIT 10) x LEFT JOIN postReactions rec ON rec.postId = x.id GROUP BY x.id ) y LEFT JOIN shares sh ON sh.postId = y.id GROUP BY y.id) postTable LEFT JOIN profiles pro ON pro.id = postTable.uid", { type: db.sequelize.QueryTypes.SELECT})
    .then(users => {
        res.send(users)
    // We don't need spread here, since only the results will be returned for select queries
  })
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
            return res.status(400).send({success:false, data:false});
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
            return res.status(400).send({success:false,data:false})
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
