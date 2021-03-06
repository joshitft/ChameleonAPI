// let logger = require('./../logger');
// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa'),
    config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

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
    checkJwt : checkJwt,
    publicGet,
    publicPost
};