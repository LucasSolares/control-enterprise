const Store = require('./store')

async function addBranchOffice(country = '', address = '', postal_code= 0, enterprise) {

    let branchOfficeToAdd;

    try {
        country = country.trim()
        address = address.trim()
        if(!(country && address && postal_code && enterprise)) {
            throw {messsage: 'Missing data something like country, address, postal_code or enterprise', code: 400}
        }
        branchOfficeToAdd = {country, address, postal_code, enterprise}
        return await Store.addBranchOffice(branchOfficeToAdd)
    } catch (error) {
        console.error(error)
        throw error
    }

}

async function listBranchOffices(_id, country = '', enterprise) {
    let filter = {}

    try {
        if(!enterprise){
            throw {message: 'You need to provide an enterprise to found branch offices', code: 400}
        } else if(_id) {
            filter._id = _id
        } else if(country) {
            filter.country = country
        }
        return await Store.listBranchOffices(filter)
    } catch (error) {
        console.error(error)
        throw error
    }
    

}