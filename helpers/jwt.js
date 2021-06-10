const expressJwt = require('express-jwt')

//prtecting api and authencticate using JWT middleware
function authJwt() {
    const secret = process.env.secret
    const api = process.env.API_URL
    return expressJwt({
        secret,
        algorithms: ['HS256']
    })
        // excluding REST api routes from authentication
        .unless({
            path: [
                {
                    url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'],
                    url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']
                },
                `${api}/users/login`,
                `${api}/users/register`,
            ]
        })
}

module.exports = authJwt;