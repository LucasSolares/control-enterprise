const Model = require('./model')

exports.addBranchOffice = async (branchOffice) => {
    try {
        const branchOfficeNew = new Model(branchOffice)
        return await branchOfficeNew.save()
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.listBranchOffices = async (filter, options = {}) => {

    try {
        return await Model.find(filter)
    } catch (error) {
        console.error(error)
        throw error
    }

}

exports.updateBranchOffice = async (_id, branchOfficeToUpdate, options = {}) => {

    try {
        const branchOfficeUpdated = await Model.findByIdAndUpdate(_id, branchOfficeToUpdate, {...options, new: true})
        if(!branchOfficeUpdated) {
            throw {message: `Branch office with id ${_id} not founded`, code: 404}
        }
        return branchOfficeUpdated
    } catch (error) {
        console.error(error)
        throw error
    }

}

exports.deleteBranchOffice = async (_id, options = {}) => {

    try {
        const branchOfficeDeleted = await Model.findByIdAndDelete(_id, {...options})
        if(!branchOfficeDeleted) {
            throw {message: `Branch office with id ${_id} not founded`, code: 404}
        }
        return branchOfficeDeleted
    } catch (error) {
        console.error(error)
        throw error
    }

}