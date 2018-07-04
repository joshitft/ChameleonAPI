
const router = require('express').Router(),
    postCont = require('../controller/postCont'),
    reactCont = require('../controller/postCont/reactions'),
    db = require('../db'),
    upload = require('../util/').Multer.upload();

router.use(':post_id',(req,res,next)=>{
    db.post.findOne({
        where : {
            id : req.params.post_id
        }
    }).then(user_post => {
        if(user_post) {
            req.user_post = user_post;
            next()
        }
        else next()
    })
})


//Post Creation  
router.post('/', upload.single('attachment'), postCont.addPost);
//Post Details
router.get('/:id', postCont.getpost);
//all post
router.get('/', postCont.getAllPost);
//Post updatation
router.put('/:id', postCont.updatePost);
//Post Deletion
router.delete('/:id', postCont.deletePost);

//React to a post
router.post('/react', reactCont.addReactionToPost);
router.delete('/react', reactCont.removeReactionFromPost);

module.exports = router;