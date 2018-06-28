
const router = require('express').Router(),
    User = require('../controller/profileCont'),
    Following = require('../controller/profileCont/followers'),
    authorize = require('../authorize');

    Followers = require('../controller/profileCont/followers');

//User Profile Addition

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa'),
    config = require('../config/config.json')[process.env.NODE_ENV || 'development'];


// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://'+config.AUTH0_DOMAIN+'/.well-known/jwks.json'
    }),

    audience: config.AUDIENCE,
    issuer: "https://"+config.AUTH0_DOMAIN+"/",
    scope:'openid profile',
    algorithms: ['RS256']
})

router.post('/',User.addProfileData)
//User Details
router.get('/:id', User.getUser)
//Update User
router.put('/:id', User.updateUser)
//Delete User
router.delete('/:id', User.deleteUser)


router.get('/getfollowers/:id', Followers.getFollowers);
router.get('/getfollowings/:id', Followers.getFollowings);
router.post('/follow',Following.addFollower);

module.exports = router;