const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    employment_name: String,
    position: String,
    department: String,
    enterprise: {
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: 'enterprise'
    },
    branch_office: {
        type: Schema.Types.ObjectId,
        ref: 'branchOffice'
    }
})

module.exports = mongoose.model('employment', schema)