const response = require('../../network/response')

const Auth = require('../../auth')
const Store = require('./store')

exports.checkAuth = (action) => {
    function authMiddleWare(req, res, next) {
        try {
            const token = Auth.decodeAuthorization(req)
            const payload = Auth.decodeToken(token)

            switch (action) {
                case 'updateDeleteOrList':
                    req.body.enterprise = payload.sub
                    next()
                    break

                case 'create':
                    req.body.enterprise = payload.sub
                    next()
                    break

                default:
                    console.error(`Action ${action} Not implemented yet`)
                    response.error(res, 500)
            }
        } catch (error) {
            console.error(error)
            response.error(res, error.code)
        }
    }
    return authMiddleWare
}
