
const router = require('express').Router(),
postCont = require('../controller/postCont');

/*
POST /post/:userId
GET /post/:id
PUT /post/:id
DEL /post/:id
*/


//Post Creation  
router.post('/', postCont.addPost)
//Post Details
router.get('/:id', postCont.getposts)
//Post updatation
router.put('/:id', postCont.updatePost)
//Post Deletion
router.delete('/:id', postCont.deletePost)

module.exports = router;