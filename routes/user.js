
/*
1.POST => /user
2.GET  => /user/:id
3.PUT/PATCH => /user/:id
4.DEL => /user/:id
*/

const router = require('express').Router(),
    User = require('../controller/profile')

//Signup    
router.post('/', User.addUser)
//User Details
router.get('/:id', User.getUser)
//Update User
router.put('/:id', User.updateUser)
//Delete User
router.delete('/:id', User.deleteUser)

module.exports = router;