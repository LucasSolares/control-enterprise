const express = require('express')

const response = require('../../network/response')
const Controller = require('./controller')

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
    const {enterprise_name, description} = req.body
    try {
        const newEnterprise = await Controller.addEnterprise(enterprise_name, description)
        response.success(res, newEnterprise, 201)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})
router.put('/', async (req, res) => {

    const {_id, enterprise_name, description} = req.body

    try {
        const enterpriseUpdated = await Controller.updateEnterprise(_id, enterprise_name, description)
        response.success(res, enterpriseUpdated)
    } catch (error) {
        response.error(res, error.code)
    }

})
router.delete('/', async (req, res) => {
    const {_id} = req.body

    try {
        const enterpriseDeleted = await Controller.deleteEnterprise(_id)
        response.success(res, enterpriseDeleted)
    } catch (error) {
        response.error(res, error.code)
    }
})

module.exports = router