const response = require('../../network/response')

const Auth = require('../../auth')

exports.checkAuth = (action) => {
    function authMiddleWare(req, res, next) {
        try {
            const token = Auth.decodeAuthorization(req)
            const payload = Auth.decodeToken(token)

            switch (action) {
                case 'updateOrDelete':
                    req.body._id = payload.sub
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
