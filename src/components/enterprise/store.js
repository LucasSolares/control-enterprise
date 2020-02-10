const Model = require('./model')

exports.addEnterprise = async (enterprise) => {
    try {
        const newEnterprise = new Model(enterprise)
        return await newEnterprise.save()
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }
}

exports.listEnterprises = async (filter) => {

    try {
        return await Model.find(filter)
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

exports.updateEnterprise = async (_id, enterpriseToUpdate) => {

    try {

        const enterpriseUpdated = await Model.findByIdAndUpdate(_id, enterpriseToUpdate, { new: true })
        if(!enterpriseUpdated) {

            throw {message: `Enterprise with ${_id} not founded`, code: 404}

        }
        return enterpriseUpdated

    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

exports.deleteEnterprise = async (_id) => {

    try {
        const enterpriseDeleted = await Model.findByIdAndDelete(_id)
        if(!enterpriseDeleted) {

            throw {message: `Enterprise with ${_id} not founded`, code: 404}

        }
        return enterpriseDeleted
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}