let express = require('express');
let router = express.Router();
let authCont = require('../controller/auth')
const passport = require('passport');

router.use('/user',require('./user'));
const env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL:
    process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

router.get('/login', passport.authenticate('auth0', {
        clientID: env.AUTH0_CLIENT_ID,
        domain: env.AUTH0_DOMAIN,
        redirectUri: env.AUTH0_CALLBACK_URL,
        responseType: 'code',
        audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
        scope: 'openid profile'}),
    function(req, res) {
        res.redirect("/");
    });

router.get('/callback',
    passport.authenticate('auth0', {
        failureRedirect: '/failure'
    }),
    function(req, res) {
        console.log("RES USER : ",res.user)
        res.redirect(req.session.returnTo || '/');
    }
);

router.get('/failure', function(req, res) {
    var error = req.flash("error");
    var error_description = req.flash("error_description");
    req.logout();
    res.render('failure', {
        error: error[0],
        error_description: error_description[0],
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/login', authCont.loginCallback);
module.exports = router;
