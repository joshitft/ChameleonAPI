let express = require('express');
let router = express.Router();
let feedCont = require('../controller/feedCont');

const auth = require('../authorize')
router.get('/', auth, feedCont.getOneFeed);

module.exports = router;