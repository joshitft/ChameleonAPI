
const router = require('express').Router(),
    User = require('../controller/profileCont'),
    db = require('../db'),
    util = require('../util'),
    Following = require('../controller/profileCont/followers'),

    Followers = require('../controller/profileCont/followers');

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

router.post('/',User.addProfileData);                       //Add user

router.get('/:id', User.getUser);                            //User Details
//Update User
router.put('/:id' , User.updateUser)
//Delete User
router.delete('/:id', User.deleteUser)


router.get('/getfollowers/:id', Followers.getFollowers);
router.get('/getfollowings/:id', Followers.getFollowings);
router.post('/follow',Following.addFollower);

module.exports = router;