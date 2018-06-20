
/*
1.POST => /user
2.GET  => /user/:id
3.PUT/PATCH => /user/:id
4.DEL => /user/:id
*/

const router = require('express').Router(),
    User = require('../controller/profile')

    
router.post('/', User.addUser)

router.get('/:id', User.getUser)

router.put('/:id', User.updateUser)

router.delete('/', User.deleteUser)

module.exports = router;