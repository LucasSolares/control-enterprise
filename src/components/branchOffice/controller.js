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

async function updateBranchOffice(_id, country = '', address = '', postal_code= 0, enterprise) {

    let branchOfficeToUpdate = {}

    try {
        if(_id) {
            if(country) {
                branchOfficeToUpdate.country = country
            }
            if(address) {
                branchOfficeToUpdate.address = address
            }
            if(postal_code) {
                branchOfficeToUpdate.postal_code = postal_code
            }
            if(enterprise) {
                branchOfficeToUpdate.enterprise = enterprise
            }
            if(Object.keys(branchOfficeToUpdate).length !== 0) {
                return await Store.updateBranchOffice(_id, branchOfficeToUpdate)
            }
        }
        throw {message: 'Missing data something like _id, country, address, postal_code or enterprise', code: 400}
    } catch (error) {
        console.error(error)
        throw error
    }

}

async function deleteBranchOffice(_id) {

    try {
        return await Store.deleteBranchOffice(_id)
    } catch (error) {
        console.error(error)
        throw error
    }

}

module.exports = 
{
    addBranchOffice,
    listBranchOffices,
    updateBranchOffice,
    deleteBranchOffice
}