
const router = require('express').Router(),
postCont = require('../controller/postCont');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb)=> {
        let fileArr = file.originalname.split('.');
        cb(null, fileArr[0] + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage:storage});
/*
POST /post/:userId
GET /post/:id
PUT /post/:id
DEL /post/:id
*/


//Post Creation  
router.post('/', upload.single('blogImage'), postCont.addPost);
//Post Details
router.get('/:id', postCont.getpost)
//all post
router.get('/', postCont.getAllPost)
router.get('/:id', postCont.getposts);
//Post updatation
router.put('/:id', postCont.updatePost);
//Post Deletion
router.delete('/:id', postCont.deletePost);

module.exports = router;