const expressJwt = require('express-jwt')

//prtecting api and authencticate using JWT middleware
function authJwt() {
    const secret = process.env.secret
    return expressJwt({
        secret,
        algorithms: ['HS256']
    })
        // excluding REST api routes from authentication
        .unless({
            path: [
                { url: '/api/v1/products', methods: ['GET', 'OPTIONS'] },
                '/api/v1/users/login',
                '/api/v1/users/register'
            ]
        })
}

module.exports = authJwt;