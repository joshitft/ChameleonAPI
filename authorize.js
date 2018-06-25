const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://joshi-suresh.auth0.com/.well-known/jwks.json`
    }),

    audience: 'http://localhost:3000',
    issuer: `https://joshi-suresh.auth0.com/`,
    algorithms: ['RS256'],
    scope: 'openid profile'
});

module.exports = checkJwt;