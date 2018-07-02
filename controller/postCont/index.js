const db = require('../../db'),
    util = require('../../util');


exports.addPost = (req,res)=>{
    //body object format needed and then checks required
    console.log(req.file);
    req.body.imageLink = req.file ? req.file.filename : '';
    let postDBObj = fetchPostDBObj(req.body);

    if(!postDBObj.profileId )
        util.errorHandler.call(this,400,{message : 'Profile Id not found'}, res)

    if(req.file){
        let attachmentDBObj = {
            fileName: req.file.filename ? req.file.filename : '',
            fileType: req.file.mimetype
        };
        db.attachments.create(attachmentDBObj)
            .then(attachment =>{
                postDBObj.attachmentId = attachment.dataValues.id;
                db.post.create(postDBObj)
                    .then(post=> util.sendResponse.call(this,200,post,res))
                    .catch(err => util.errorHandler.call(this,400,{message : 'Error in creating post'}, res))
            }).catch(err => {
            util.errorHandler.call(this,400,{message : 'Error in creating attachment'}, res)
        });
    }else{
        db.post.create(postDBObj)
            .then(post=> util.sendResponse.call(this,200,post,res))
            .catch(err => util.errorHandler.call(this,400,{message : 'Error in creating post'}, res))
    }
};
//update as per getAllposts
exports.getpost = (req,res)=>{
    let postID = req.params.id;
    let resultData = {}
    if(!parseInt(postID,10))
        return util.errorHandler.call(this,422,{message : "Post with this ID doesn't exist"}, res)

    db.post.findById(postID)
    .then(post =>{
        if(!post) return util.errorHandler.call(this,422,{message : 'Error in getting the posts'}, res)

        resultData.data.post = post;
        //return commentController.getComments(post.id);
        //write logic here
    })
    .then(comments => {
        if(!comments)
            throw new Error('content not found');
        
        resultData.success = true;
        resultData.data.comments = comments;
        util.sendResponse.call(this,200,comments,res)
    })
    .catch(err => { 
        util.errorHandler(err,req,res)
    });  
};

exports.getAllPost = (req,res)=>{
    const query = `SELECT postTable.*, pro.firstName,pro.lastName,pro.country,pro.city,pro.picture 
    AS userImage
    FROM (
        SELECT y.*,COUNT(sh.id) shareCount
        FROM (
            SELECT x.*,COUNT(rec.id) reactCount
            FROM (
                SELECT a.id,a.content,a.createdAt,a.profileId AS uid,att.fileName AS postImage
                    ,COUNT(c.content) AS commentCount
                FROM posts a
                LEFT JOIN comments c ON a.id = c.postId
                LEFT JOIN attachments att ON a.attachmentId = att.id
                GROUP BY a.id
                ORDER BY a.createdAt DESC
                ) x
            LEFT JOIN postReactions rec ON rec.postId = x.id
            GROUP BY x.id
            ) y
        LEFT JOIN shares sh ON sh.postId = y.id
        GROUP BY y.id
        ) postTable
    LEFT JOIN profiles pro ON pro.id = postTable.uid;`;

    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT})
    .then(users => {
        util.sendResponse.call(this,201,users,res)
    // We don't need spread here, since only the results will be returned for select queries
  }).catch(err => util.errorHandler.call(this,400,{message : 'Error in getting post'}, res))
};

exports.updatePost = (req,res)=>{
    let postID = req.params.id; 
    if(!parseInt(postID,10))
        return res.status(400).send({success:true,data:false});

    const postDBObj = fetchPostDBObj(req.body);
    db.post.update(postDBObj,{ where: { id: postID }})
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

    db.post.destroy({where:{'id':postID}}).then(rowAffected =>{
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
            // imageLink: post.imageLink
        }
}
