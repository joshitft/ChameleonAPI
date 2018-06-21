let express = require('express');
let router = express.Router();
let feedCont = require('../controller/feedCont');

router.get('/', feedCont.getOneFeed);

module.exports = router;