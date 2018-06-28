// let logger = require('./../logger');
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
    }),
    publicGet = [
        '/',
    ],
    publicPost = [
        '/'
    ];

module.exports = {
    middleware : (req,res,next)=> {
        if (req.method === 'OPTIONS') {
            res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
            res.statusCode = 200;
            res.end();
            return;
        }
        let isPublic = false;
        let path = req._parsedOriginalUrl ? req._parsedOriginalUrl.pathname : req.originalUrl;

        switch (req.method) {
            case 'GET':
                isPublic = publicGet.indexOf(path) !== -1;
                break;
            case 'POST':
                isPublic = publicPost.indexOf(path) !== -1;
                break;
        }
        console.log('=====IisPublic===',isPublic)
        if (isPublic) {
            next();
        } else {
            checkJwt
        }
    }
};