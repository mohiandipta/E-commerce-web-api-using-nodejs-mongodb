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
            path: ['/api/v1/users/login']
        })
}

module.exports = authJwt;