const db = require('../../db'),
    util = require('../../util'),
    commentCont = require('../commentCont')


exports.addPost = (req,res)=>{
    //body object format needed and then checks required
    if(!req.isUserPresent) return util.errorHandler.call(this,422,{message:'User is not present in toekn'},res)

    let postDBObj = fetchPostDBObj(req.body);
    postDBObj.profileId = req.isUserPresent.profileId;
    if(!postDBObj.profileId ) return util.errorHandler.call(this,400,{message : 'Profile Id not found'}, res)

    if(req.file){
        let attachmentDBObj = {
            fileName: req.file.filename ? req.file.filename : '',
            fileType: req.file.mimetype
        };
        db.attachments.create(attachmentDBObj)
            .then(attachment =>{
                postDBObj.attachmentId = attachment.id;
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
//get a single post
exports.getpost = (req,res)=>{
    let postID = req.params.id;
    let resultData = {}; 
    if(!parseInt(postID,10))
        throw new Error("Post ID is required as an input");

    db.post.findById(postID)
    .then(post =>{
        if(!post) 
            throw new Error(`No post found with ID ${postID}`)

        resultData.post = post;
        let promise = [];
        promise.push(db.profile.findById(post.profileId,{attributes: ['firstName','picture']}));
        promise.push(db.postReactions.findAll({ where: {'postId':post.id}, attributes:['profileId','reactionTypeId']}));
        promise.push(db.share.count({ where: {'postId':post.id}}));
        promise.push(commentCont.getComments(post.id,['profileId','content','createdAt']));
        promise.push(db.attachments.findById(post.attachmentId,{attributes: ['fileName']}))
        return Promise.all(promise)
    })
    .then(postrelatedData => {
        if(!postrelatedData)
            throw new Error("Error in fetching post related data");
        resultData.user = postrelatedData[0];
        resultData.reactions = postrelatedData[1];
        resultData.shareCount = postrelatedData[2];
        resultData.comments = postrelatedData[3];
        resultData.post.dataValues.attachment = postrelatedData[4].fileName;
        
        let reactionArr = postrelatedData[1],
            promise = [];
        if(!reactionArr.length)
            return null
        for(let i=0; i<reactionArr.length;i++)
        {
            promise.push(db.profile.findById(reactionArr[i].profileId,{attributes: ['firstName','lastName','picture']}))
        }
        return Promise.all(promise)
    })
    .then(reactionUsers => {
        if(reactionUsers)
        {
            for(let i=0;i<reactionUsers.length;i++){
                resultData.reactions[i].dataValues.userName = reactionUsers[i].dataValues.firstName+" "+reactionUsers[i].lastName;
                resultData.reactions[i].dataValues.picture = reactionUsers[i].dataValues.picture;
            }
        }
        let commentArr = resultData.comments,
            promise = [];
        if(!commentArr)
            return null    
        for(let i=0; i<commentArr.length;i++)
        {
            promise.push(db.profile.findById(commentArr[i].profileId,{attributes: ['firstName','lastName','picture']}))
        }
        
        return Promise.all(promise)
    })
    .then(commentingUsers =>{
        if(commentingUsers)
        {
            for(let i=0;i<commentingUsers.length;i++){
                resultData.comments[i].dataValues.userName = commentingUsers[i].firstName+" "+commentingUsers[i].lastName;
                resultData.comments[i].dataValues.picture = commentingUsers[i].picture;
            }
        }
        util.sendResponse.call(this,200,resultData,res)
        
    })
    .catch(err =>
        {
            util.errorHandler.call(this,400,{message : err.message}, res)
        }
    );
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
            util.sendResponse.call(this,200,users,res)
        // We don't need spread here, since only the results will be returned for select queries
      }).catch(err => util.errorHandler.call(this,400,{message : 'Error in finding post'}, res))
};

exports.updatePost = (req,res)=>{
    let postID = req.params.id; 
    if(!parseInt(postID,10))
        return util.errorHandler.call(this,400,{message : 'invalid postID'}, res);

    const postDBObj = fetchPostDBObj(req.body);
    db.post.update(postDBObj,{ where: { id: postID }})
    .spread((affectedCount, affectedRows) => {
        // affectedRows will only be defined in dialects which support returning: true
        if(!affectedCount)
            return util.errorHandler.call(this,400,{message : 'postId not found'}, res);
        util.sendResponse.call(this,200,affectedCount,res);
    }).catch(err => {
        util.errorHandler.call(this,400,{message : 'Error in updating post'}, res);
    })
};

exports.deletePost = (req,res)=>{
    let postID = req.params.id;
    if(!parseInt(postID,10))
        return util.errorHandler.call(this,400,{message : 'invalid postId'}, res);

    db.post.destroy({where:{'id':postID}}).then(rowAffected =>{
        if(!affectedCount)
            return util.errorHandler.call(this,400,{message : 'postId not found'}, res);
        util.sendResponse.call(this,200,affectedCount,res);
    })
    .catch(err => { 
        util.errorHandler.call(this,400,{message : 'Error in deleting post'}, res);
    })
};


function fetchPostDBObj(post){
    return dbObj = {
            profileId: post.profileId,
            content: post.content,
        }
}