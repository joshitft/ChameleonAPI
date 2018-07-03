let express = require('express');
let util = require('../util');
let router = express.Router(),
    db = require('../db');
let apiKeyCheck = require('../authenticate/apiKeyCheck');

router.use('/',(req,res,next)=>{
    let isPublic = false;
    let path = req._parsedOriginalUrl ? req._parsedOriginalUrl.pathname : req.originalUrl;

    switch (req.method) {
        case 'GET':
            isPublic = apiKeyCheck.publicGet.indexOf(path) !== -1;
            break;
        case 'POST':
            isPublic = apiKeyCheck.publicPost.indexOf(path) !== -1;
            break;
    }
    if (isPublic)
        next();
    else
      next()
        // router.use(apiKeyCheck.checkJwt);

});

router.use(apiKeyCheck.checkJwt);

router.use('/',(req,res,next)=>{
    if(req.user && req.user['https://tft']){
        db.auth.findOne({
            where: {
                id: req.user['https://tft']._id
            },
            include: [{ model: db.profile}]
        }).then(user => {
            if(user) {
                req.isUserPresent = user;
            }
            next()
        })
    }
    else
        return util.errorHandler.call(this,422,{message : 'User Object is not present in token'},res)

});
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.use('/user',require('./user'));
router.use('/auth',require('./auth'));
router.use('/post',require('./post'));
router.use('/search',require('./search'));
router.use('/comment',require('./comment'));


module.exports = router;
