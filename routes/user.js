/*
1.POST => /user
2.GET  => /user/:id
3.PUT/PATCH => /user/:id
4.DEL => /user/:id
*/
const router = require('express').Router()


router.POST('/user', (req, res, next)=>{

    //to add a user
})

router.GET('/user/:id', (req, res, next)=>{

    //to send details of user
})

router.PUT('/user/:id', (req, res, next)=>{

    //to update details of a user
})

router.DELETE('/user', (req, res, next)=>{

    //to delete a user
})



module.exports = router;