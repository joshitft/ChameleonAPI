const db = require('../../db'),
    util = require('../../util');


exports.addPost = (req,res)=>{
    //body object format needed and then checks required
    console.log(req.file);
    req.body.imageLink = req.file ? req.file.filename : '';
    let postDBObj = fetchPostDBObj(req.body);

    if(!postDBObj.profileId)
        return res.status(400).send({success:false,data: false}); //just for begining: make sure all data is present in inserting object

    db.post.create(postDBObj)
    .then(post => {
        util.sendResponse.call(this,201,post,res)
    })
    .catch(err => {
        util.errorHandler.call(this,400,{message : 'Error in creating post'}, res)
    })
    
};
//update as per getAllposts
exports.getpost = (req,res)=>{
    let postID = req.params.id;
    let resultData = {success: false, data:{}}; 
    if(!parseInt(postID,10))
        return util.errorHandler.call(this,422,{message : 'Error in finding post'}, res)
    
    db.post.findById(postID,{attributes: ['id','profileId','content','imageLink']})
    .then(post =>{
        if(!post)
            return util.errorHandler.call(this,422,{message : 'Error in finding post'}, res)
        
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

    /*add for pagination*/
    /*const url = require('url'),
        url_parts = url.parse(req.url, true),
        offset = (url_parts.query.page - 1) * 10 + ",",
        limit = "LIMIT "+offset+10;*/

        db.sequelize.query("SELECT postTable.* ,pro.firstName ,pro.lastName, pro.country, pro.city,pro.picture AS userImage FROM (SELECT y.* ,COUNT(sh.id) shCount FROM ( SELECT x.* ,COUNT(rec.id) recId FROM ( SELECT a.id ,a.content ,a.createdAt ,a.profileId AS uid,a.imageLink AS postImage,COUNT(c.content) AS 'count' FROM posts a LEFT JOIN comments c ON a.id = c.postId GROUP BY a.id ORDER BY a.createdAt DESC) x LEFT JOIN postReactions rec ON rec.postId = x.id GROUP BY x.id ) y LEFT JOIN shares sh ON sh.postId = y.id GROUP BY y.id) postTable LEFT JOIN profiles pro ON pro.id = postTable.uid", { type: db.sequelize.QueryTypes.SELECT})
        .then(users => {
            util.sendResponse.call(this,200,users,res)
        // We don't need spread here, since only the results will be returned for select queries
      }).catch(err => util.errorHandler.call(this,400,{message : 'Error in creating post'}, res))

};

exports.updatePost = (req,res)=>{
    let postID = req.params.id; 
    if(!parseInt(postID,10))
        return res.status(400).send({success:true,data:false});

    postDBObj = fetchPostDBObj(req.body);
    db.postModel.update(postDBObj,{ where: { id: postID }})
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

    db.postModel.destroy({where:{'id':postID}}).then(rowAffected =>{
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