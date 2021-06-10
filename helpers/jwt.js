const expressJwt = require('express-jwt')

//prtecting api and authencticate using JWT middleware
function authJwt() {
    const secret = process.env.secret
    return expressJwt({
        secret,
        algorithms: ['HS256']
    })
}

module.exports = authJwt;