let express = require('express');
let util = require('../util');
let router = express.Router();
let apiKeyCheck = require('../authenticate/apiKeyCheck');

router.use('/user',apiKeyCheck.checkJwt,require('./user'));
router.use('/auth',require('./auth'));
router.use('/post',require('./post'));
router.use('/search',require('./search'));
router.use('/comment',require('./comment'));

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
