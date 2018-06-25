let express = require('express');
let router = express.Router();
let loginAuth = require('../controller/authCont')

router.get('/signuptrue' , loginAuth.successSignup);

module.exports = router;