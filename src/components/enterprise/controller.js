const Template = require('../../templates/enterprises')
const Store = require('./store')

const Auth = require('../../auth')
const StoreEmployments = require('../employment/store')

async function addEnterprise(enterprise_name = '', description = '', email = '', password = '') {

    try {
        enterprise_name = enterprise_name.trim()
        description = description.trim()
        email = email.trim()
        password = password.trim()

        const enterpriseAlreadyWithThatEmail = await Store.listEnterprises({email})
        if(enterpriseAlreadyWithThatEmail.pop()) {
            throw {message: 'Sorry there was an enterprise with that email', code: 400}
        }
        if(!(enterprise_name && description && email && password)) {

            throw {message: 'Missing Data something like enterprise_name, description, email or password', code: 400}

        }
        const passwordHashed = await Auth.hashPassword(password)
        return await Store.addEnterprise({enterprise_name, description, email, password: passwordHashed})


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

async function updateEnterprise(_id, enterprise_name = '', description = '', email = '', password = '',) {

    let enterpriseUpdated = {}

    try {
        enterprise_name = enterprise_name.trim()
        description = description.trim()
        email = email.trim()
        password = password.trim()
        if(_id) {
            if(enterprise_name) {
                enterpriseUpdated.enterprise_name = enterprise_name
            }
            if(description) {
                enterpriseUpdated.description = description
            }
            if(email) {
                enterpriseUpdated.email = email
            }
            if(password) {
                enterpriseUpdated.password = await Auth.hashPassword(password)
            }
            if(Object.keys(enterpriseUpdated).length > 0) {

                return await Store.updateEnterprise(_id, enterpriseUpdated)

            }
        }
        
        throw {message: 'Missing Data, something like enterprise_name, description, email, password or _id', code: 400}
        
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

        const enterpriseDeleted = await Store.deleteEnterprise(_id)
        if(!enterpriseDeleted) {
            throw {message: `The enterprise with id ${enterpriseDeleted._id} not founded`}
        }
        await StoreEmployments.deleteEmployment(undefined, {enterprise: enterpriseDeleted._id})
        return enterpriseDeleted
        
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

async function signIn(email = '', password = '') {

    try {
        email = email.trim()
        password = password.trim()

        if(!(email && password)) {
            throw {message: 'Missing data something like email or password', code: 400}
        }

        const enterprise = (await Store.listEnterprises({email})).pop()
        if(!enterprise) {
            throw {message: `There was no enterprise with email: ${email}`, code: 400}
        }
        const passwordCorrect = await Auth.comparePassword(password, enterprise.password)
        if(!passwordCorrect) {
            throw {message: 'Password incorrect', code: 400}
        }
        return Auth.generateAndSignToken({sub: enterprise.id})
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
    generateReport,
    signIn

}