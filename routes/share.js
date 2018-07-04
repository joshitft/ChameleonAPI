const router = require('express').Router(),
shareCont = require('../controller/postCont/share')


//share addition  
router.post('/', shareCont.addShare);
// //Get comments for a post
// router.get('/:postId', shareCont.getComments)

// //Comment updatation
// router.put('/:id', shareCont.updateComment);
// //Post Deletion
// router.delete('/:id', shareCont.deleteComment);

module.exports = router;