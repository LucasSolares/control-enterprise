const express = require('express')

const response = require('../../network/response')
const Controller = require('./controller')
const Secure = require('./secure')

const router = express.Router()

router.get('/', async (req, res) => {
    const {_id} = req.body
    try {
        const enterprises = await Controller.listEnterprises(_id)
        response.success(res, enterprises)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})
router.post('/', async (req, res) => {
    const {enterprise_name, description, email, password} = req.body
    try {
        const newEnterprise = await Controller.addEnterprise(enterprise_name, description, email, password)
        response.success(res, newEnterprise, 201)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})

router.post('/report', async (req, res) => {
    try {
        const URL = await Controller.generateReport()
        response.success(res, URL, 201)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})

router.put('/', Secure.checkAuth('checkOwn'), async (req, res) => {

    const {_id, enterprise_name, description, email, password} = req.body

    try {
        const enterpriseUpdated = await Controller.updateEnterprise(_id, enterprise_name, description, email, password)
        response.success(res, enterpriseUpdated)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }

})
router.delete('/', Secure.checkAuth('checkOwn'), async (req, res) => {
    const {_id} = req.body

    try {
        const enterpriseDeleted = await Controller.deleteEnterprise(_id)
        response.success(res, enterpriseDeleted)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body
    try {
        const token = await Controller.signIn(email, password)
        response.success(res, token)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})

module.exports = router