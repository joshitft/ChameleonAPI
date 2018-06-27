
const router = require('express').Router(),
    postCont = require('../controller/postCont'),
    upload = require('../util/').Multer.upload();

/*
POST /post/:userId
GET /post/:id
PUT /post/:id
DEL /post/:id
*/


//Post Creation  
router.post('/', upload.single('attachment'), postCont.addPost);
//Post Details
router.get('/:id', postCont.getpost)
//all post
router.get('/', postCont.getAllPost)

//Post updatation
router.put('/:id', postCont.updatePost);
//Post Deletion
router.delete('/:id', postCont.deletePost);

module.exports = router;