const response = require('../../network/response')

const Auth = require('../../auth')

function checkOwn(req, payload) {
    try {
        if (!req.body._id) {
            throw { message: '_id is not sended', code: 400 }
        }
        return req.body._id === payload.sub
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.checkAuth = (action) => {
    function authMiddleWare(req, res, next) {
        try {
            const token = Auth.decodeAuthorization(req)
            const payload = Auth.decodeToken(token)

            switch (action) {
                case 'checkOwn':
                    const areTheOwner = checkOwn(req, payload)
                    if (!areTheOwner) {
                        throw { message: 'This is not your enterprise', code: 401 }
                    }
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
