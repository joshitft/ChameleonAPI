
const router = require('express').Router(),
    User = require('../controller/profile'),
    authorize = require('../authorize');


//User Profile Addition  
router.post('/', User.addProfileData)
//User Details
router.get('/:id', User.getUser)
//Update User
router.put('/:id', User.updateUser)
//Delete User
router.delete('/:id', User.deleteUser)

module.exports = router;