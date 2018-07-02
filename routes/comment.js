

const router = require('express').Router(),
commentCont = require('../controller/commentCont')


//Comment addition  
router.post('/', commentCont.addComment);
//Get comments for a post
router.get('/:postId', commentCont.getComments)

//Comment updatation
router.put('/:id', commentCont.updateComment);
//Post Deletion
router.delete('/:id', commentCont.deleteComment);

module.exports = router;