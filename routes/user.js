
const router = require('express').Router(),
    User = require('../controller/profileCont'),
    db = require('../db'),
    util = require('../util'),
    Following = require('../controller/profileCont/followers'),

    Followers = require('../controller/profileCont/followers');

router.post('/',  User.addProfileData);                       //Add user
router.get('/:user_id', User.getUser);                       //User Details
router.put('/', User.updateUser);                  //Update User
router.delete('/:user_id', User.deleteUser);                //Delete User


router.get('/getfollowers/:id', Followers.getFollowers);
router.get('/getfollowings/:id', Followers.getFollowings);
router.post('/follow', Following.addFollower);

module.exports = router;