let express = require('express');
let router = express.Router();

router.use('/user',require('./user'));
router.use('/auth',require('./auth'));
router.use('/post',require('./post'));

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
