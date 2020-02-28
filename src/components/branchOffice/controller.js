const Store = require('./store')

async function addBranchOffice(country = '', address = '', postal_code= 0, enterprise) {

    let branchOfficeToAdd;

    try {
        country = country.trim()
        address = address.trim()
        if(!(country && address && postal_code && enterprise)) {
            throw {messsage: 'Missing data something like country, address or postal_code', code: 400}
        }
        branchOfficeToAdd = {country, address, postal_code, enterprise}
        return await Store.addBranchOffice(branchOfficeToAdd)
    } catch (error) {
        console.error(error)
        throw error
    }

}

async function listBranchOffices(_id, country = '', enterprise) {
    let filter = {enterprise}

    try {
        if(!enterprise){
            throw {message: 'You need to provide an enterprise to found branch offices', code: 400}
        } else if(_id) {
            filter._id = _id
        } else if(country) {
            filter.country = { $regex: `.*${country}.*`, $options: '$i'}
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
            if(Object.keys(branchOfficeToUpdate).length !== 0) {
                return await Store.updateBranchOffice({_id, enterprise}, branchOfficeToUpdate)
            }
        }
        throw {message: 'Missing data something like _id, country, address or postal_code', code: 400}
    } catch (error) {
        console.error(error)
        throw error
    }

}

async function deleteBranchOffice(_id, enterprise) {

    try {
        return await Store.deleteBranchOffice({_id, enterprise})
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