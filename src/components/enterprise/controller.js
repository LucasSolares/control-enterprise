const Template = require('../../templates/enterprises')
const Store = require('./store')

async function addEnterprise(enterprise_name = '', description = '') {

    try {
        enterprise_name = enterprise_name.trim()
        description = description.trim()
        if(!(enterprise_name && description)) {

            throw {message: 'Missing Data something like enterprise_name or description', code: 400}

        }
        return await Store.addEnterprise({enterprise_name, description})


    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

async function listEnterprises(_id) {

    let filter = {}

    try {
        if(_id) {

            filter._id = _id

        }
        return await Store.listEnterprises(filter)
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

async function updateEnterprise(_id, enterprise_name = '', description = '') {

    let enterpriseUpdated = {}

    try {
        enterprise_name = enterprise_name.trim()
        description = description.trim()
        if(_id) {
            if(enterprise_name) {
                enterpriseUpdated.enterprise_name = enterprise_name
            }
            if(description) {
                enterpriseUpdated.description = description
            }
            if(Object.keys(enterpriseUpdated).length > 0) {

                return await Store.updateEnterprise(_id, enterpriseUpdated)

            }
        }
        
        throw {message: 'Missing Data, something like enterprise_name, description or _id', code: 400}
        
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

async function deleteEnterprise(_id) {

    try {

        if(!_id) {

            throw {message: 'Missing Data you dont send de Id of enterprise', code: 400}
    
        }
        return await Store.deleteEnterprise(_id)
        
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    } 

}

async function generateReport() {

    try {
        const enterprises = await Store.listEnterprises({})
        const URL = Template.generateReport(enterprises)
        return URL
    } catch (error) {
        console.error(error)
        throw error
    }

}

module.exports =
{

    addEnterprise,
    listEnterprises,
    updateEnterprise,
    deleteEnterprise,
    generateReport

}