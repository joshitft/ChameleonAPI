let express = require('express');
let router = express.Router();
let authCont = require('../controller/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', authCont.loginCallback);
module.exports = router;
