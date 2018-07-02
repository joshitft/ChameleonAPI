const db = require('../../db'),
    util = require('../../util');


exports.addPost = (req,res)=>{
    //body object format needed and then checks required
    console.log(req.file);
    req.body.imageLink = req.file ? req.file.filename : '';
    let postDBObj = fetchPostDBObj(req.body);

    if(!postDBObj.profileId )
        util.errorHandler.call(this,400,{message : 'Profile Id not found'}, res)

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
};
//get a single post
exports.getpost = (req,res)=>{
    let postID = req.params.id;
    let resultData = {success: false, data:{}}; 
    if(!parseInt(postID,10))
        return util.errorHandler.call(this,422,{message : "Post with this ID doesn't exist"}, res)

    db.post.findById(postID)
    .then(post =>{
        if(!post) return util.errorHandler.call(this,422,{message : 'Error in getting the posts'}, res)

        resultData.data.post = post;
        let promise = [];
        promise.push(db.profile.findById(post.profileId,{attributes: ['firstName','picture']}));
        promise.push(db.postReactions.count({ where: {'postId':post.id}}));
        promise.push(db.share.count({ where: {'postId':post.id}}));
        promise.push(db.comment.findAll(
            {
                where:{'postId':post.id}, 
                attributes: ['profileId','content','createdAt']
            }
        ));
        return Promise.all(promise)
    },rejectionCB)
    .then(postrelatedData => {
        
        resultData.data.user = postrelatedData[0];
        resultData.data.reactionCount = postrelatedData[1];
        resultData.data.shareCount = postrelatedData[2];
        resultData.data.comments = postrelatedData[3];

        let commentArr = postrelatedData[3];
        let promise = [];
        for(let i=0; i<commentArr.length;i++)
        {
            promise.push(db.profile.findById(commentArr[i].profileId,{attributes: ['firstName','picture']}))
        }

        return Promise.all(promise)
    },rejectionCB)
    .then(commentingUsers =>{
        for(let i=0;i<commentingUsers.length;i++){
            resultData.data.comments[i].dataValues.userName = commentingUsers[i].firstName;
            resultData.data.comments[i].dataValues.picture = commentingUsers[i].picture;
        }
        sendPostData();
        
    },rejectionCB)
    .catch(err =>
         util.errorHandler.call(this,400,{message : 'Error in finding post'}, res)
    );

    function sendPostData(){
        resultData.success = true;
        res.status(200).send(resultData);
    }

    function rejectionCB(rejErr){
        console.log("Promise Rejection: ",rejErr )
        util.errorHandler.call(this,400,{message : 'Error in finding post'}, res)
    }
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