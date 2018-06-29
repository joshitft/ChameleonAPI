let express = require('express');
let util = require('../util');
let router = express.Router(),
    checkJwt = require('../authenticate/apiKeyCheck').checkJwt;

router.use('/user',checkJwt,require('./user'));
router.use('/auth',require('./auth'));
router.use('/post',require('./post'));

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
