const Template = require('../../templates/employments')
const Store = require('./store')

const StoreEnterprise = require('../enterprise/store')

async function addEmployment(employment_name = '', position = '', department='', enterprise, branchOffice) {

    let employmentToAdd;

    try {
        employment_name = employment_name.trim()
        position = position.trim()
        department = department.trim()
        if(!(employment_name && position && department && enterprise)) {

            throw {message: 'Missing Data something like employment_name, position, department or enterprise', code: 400}

        }
        employmentToAdd = {employment_name, position, department, enterprise}
        if(branchOffice) {
            employmentToAdd.branchOffice = branchOffice
        }
        const newEmployment = await Store.addEmployment(employmentToAdd)
        StoreEnterprise.updateEnterprise(enterprise, {$inc: {employment_cuantity: 1}})
        return newEmployment


    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

async function listEmployments(_id, department = '', employment_name = '', position = '', enterprise, branchOffice) {
    //ENTERPRISE IS REQUIRED EVERYTIME
    let filter = {enterprise}

    try {
        console.log(position)
        department = department.trim()
        employment_name = employment_name.trim()
        position = position.trim()
        if(!enterprise) {

            throw {message: 'Missing Data enterprise is required', code: 400}

        } else if(_id) {

            filter._id = _id

        }
        else if(department) {

            filter.department = department

        }
        else if(employment_name) {

            filter.employment_name = {$regex: `.*${employment_name}.*`}
        }
        else if(position) {

            filter.position = position   

        } else if(branchOffice) {
            filter.branchOffice = branchOffice
        }

        return await Store.listEmployments(filter)
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

async function updateEmployment(_id, employment_name = '', department = '', position = '', enterprise, branchOffice) {

    let employmentUpdated = {}

    try {
        employment_name = employment_name.trim()
        department = department.trim()
        position = position.trim()
        if(_id) {
            if(employment_name) {
                employmentUpdated.employment_name = employment_name
            }
            if(department) {
                employmentUpdated.department = department
            }
            if(position) {
                employmentUpdated.position = position
            }
            if(enterprise) {
                employmentUpdated.enterprise = enterprise
            }
            if(branchOffice) {
                employmentUpdated.branchOffice = branchOffice
            }
            if(Object.keys(employmentUpdated).length > 0) {

                return await Store.updateEmployment(_id, employmentUpdated)

            }
        }
        
        throw {message: 'Missing Data something like employment_name, position, department or enterprise', code: 400}
        
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

async function deleteEmployment(_id) {

    try {

        if(!_id) {

            throw {message: 'Missing Data you dont send the Id of employment', code: 400}
    
        }
        const employmentDeleted =  await Store.deleteEmployment(_id)
        StoreEnterprise.updateEnterprise(employmentDeleted.enterprise, {$inc: {employment_cuantity: -1}})
        return employmentDeleted
        
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    } 

}

async function generateReport() {

    try {
        const orderByEnterpriseEmployments = await Store.listEmployments({}, true, { enterprise: 1 } )
        const URL = await Template.generateReport(orderByEnterpriseEmployments)
        return URL
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

module.exports =
{

    addEmployment,
    listEmployments,
    updateEmployment,
    deleteEmployment,
    generateReport

}