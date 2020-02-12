const Model = require('./model')

exports.addEmployment = async (employment) => {
    try {
        const newEmployment = new Model(employment)
        return await newEmployment.save()
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }
}

exports.listEmployments = async (filter, needToSort, query) => {

    try {
        if(needToSort && query) {
            return await Model.find(filter).sort(query).populate('enterprise').exec()
        }
        return await Model.find(filter).populate('enterprise').exec()
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

exports.updateEmployment = async (_id, employmentToUpdate) => {

    try {

        const employmentUpdated = await Model.findByIdAndUpdate(_id, employmentToUpdate, { new: true })
        if(!employmentUpdated) {

            throw {message: `Employment with ${_id} not founded`, code: 404}

        }
        return employmentUpdated

    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}

exports.deleteEmployment = async (_id) => {

    try {
        const employmentDeleted = await Model.findByIdAndDelete(_id)
        if(!employmentDeleted) {

            throw {message: `Employment with ${_id} not founded`, code: 404}

        }
        return employmentDeleted
    } catch (error) {
        console.error(error)
        console.trace()
        throw error
    }

}