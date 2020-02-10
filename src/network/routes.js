const enterpriseRouter = require('../components/enterprise/network')
const employmentRoutes = require('../components/employment/network')

exports.generateRoutes = (app) => {

    app.use('/enterprise', enterpriseRouter)
    app.use('/employment', employmentRoutes)
}