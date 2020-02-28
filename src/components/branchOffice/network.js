const express = require('express')
const response = require('../../network/response')
const router = express.Router()

const Controller = require('./controller')
const Secure = require('./secure')

router.post('/', Secure.checkAuth('create'), async (req, res) => {
    const {country, address, postal_code, enterprise} = req.body
    try {
        const branchOfficeAdded = await Controller.addBranchOffice(country, address, postal_code, enterprise)
        response.success(res, branchOfficeAdded, 201)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})

router.get('/', Secure.checkAuth('updateDeleteOrList'), async (req, res) => {
    const {_id, country = '', enterprise} = req.body
    try {
        const branchOfficeFinded = await Controller.listBranchOffices(_id, country, enterprise)
        response.success(res, branchOfficeFinded)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})

router.put('/', Secure.checkAuth('updateDeleteOrList'), async (req, res) => {
    const {_id, country = '', address = '', postal_code= 0, enterprise} = req.body
    try {
        const branchOfficeUpdated = await Controller.updateBranchOffice(_id, country, address, postal_code, enterprise)
        response.success(res, branchOfficeUpdated)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})

router.delete('/', Secure.checkAuth('updateDeleteOrList'), async (req, res) => {
    const {_id, enterprise} = req.body
    try {
        const branchOfficeDeleted = await Controller.deleteBranchOffice(_id, enterprise)
        response.success(res, branchOfficeDeleted)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})

module.exports = router