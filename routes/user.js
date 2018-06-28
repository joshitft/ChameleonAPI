
const router = require('express').Router(),
    User = require('../controller/profileCont'),
    Following = require('../controller/profileCont/followers'),
    authorize = require('../authorize');

    Followers = require('../controller/profileCont/followers');

//User Profile Addition  
router.post('/', User.addProfileData)
//User Details
router.get('/:id', User.getUser)
//Update User
router.put('/:id', User.updateUser)
//Delete User
router.delete('/:id', User.deleteUser)


router.get('/getfollowers/:id', Followers.getFollowers);
router.get('/getfollowings/:id', Followers.getFollowings);
router.post('/follow',Following.addFollower);

module.exports = router;