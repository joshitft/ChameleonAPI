let express = require('express');
let router = express.Router();
let loginAuth = require('../controller/auth')

router.get('/login' , loginAuth.loginCallback);
router.get('/signuptrue' , loginAuth.successSignup);

module.exports = router;