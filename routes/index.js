let express = require('express');
let util = require('../util');
let router = express.Router(),
    checkJwt = require('../authenticate/apiKeyCheck').checkJwt;

router.use('/user',checkJwt,require('./user'));
router.use('/auth',require('./auth'));
<<<<<<< HEAD
router.use('./post',require('./post'));
=======
router.use('/post',checkJwt,require('./post'));
>>>>>>> 9a3fd53792093a8707f5461ef67106472897c884

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
