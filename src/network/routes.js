const enterpriseRouter = require('../components/enterprise/network')
const employmentRouter = require('../components/employment/network')
const branchOfficeRouter = require('../components/branchOffice/network')

exports.generateRoutes = (app) => {

    app.use('/enterprise', enterpriseRouter)
    app.use('/employment', employmentRouter)
    app.use('/branchOffice', branchOfficeRouter)
}