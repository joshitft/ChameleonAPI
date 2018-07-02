const router = require('express').Router(),
    searchCont = require('../controller/search');

router.get('/',searchCont.getSearchResult);

module.exports = router;