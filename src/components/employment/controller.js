const Store = require('./store')

async function addEmployment(employment_name = '', position = '', department='', enterprise) {

    try {
        employment_name = employment_name.trim()
        position = position.trim()
        department = department.trim()
        if(!(employment_name && position && department && enterprise)) {

            throw {message: 'Missing Data something like employment_name, position, department or enterprise', code: 400}

        }
        return await Store.addEmployment({employment_name, position, department, enterprise})


    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

async function listEmployments(_id, department = '', employment_name = '', position = '') {

    let filter = {}

    try {
        console.log(position)
        department = department.trim()
        employment_name = employment_name.trim()
        position = position.trim()
        if(_id) {

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
        }
        return await Store.listEmployments(filter)
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

async function updateEmployment(_id, employment_name = '', department = '', position = '', enterprise) {

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
        return await Store.deleteEmployment(_id)
        
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
    deleteEmployment

}