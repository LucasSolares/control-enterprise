const express = require('express')

const response = require('../../network/response')
const Controller = require('./controller')

const router = express.Router()

router.get('/', async (req, res) => {
    const {_id, employment_name, position, department} = req.body
    try {
        const employments = await Controller.listEmployments(_id, department, employment_name, position)
        response.success(res, employments)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})
router.post('/', async (req, res) => {
    const {employment_name, position, department, enterprise} = req.body
    try {
        const newEmployment = await Controller.addEmployment(employment_name, position, department, enterprise)
        response.success(res, newEmployment, 201)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})
router.put('/', async (req, res) => {

    const {_id, employment_name, position, department, enterprise} = req.body

    try {
        const employmentUpdated = await Controller.updateEmployment(_id, employment_name, position, department, enterprise)
        response.success(res, employmentUpdated)
    } catch (error) {
        response.error(res, error.code)
    }

})
router.delete('/', async (req, res) => {
    const {_id} = req.body

    try {
        const employmentDeleted = await Controller.deleteEmployment(_id)
        response.success(res, employmentDeleted)
    } catch (error) {
        response.error(res, error.code)
    }
})

module.exports = router