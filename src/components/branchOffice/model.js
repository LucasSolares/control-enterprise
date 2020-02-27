const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    country: String,
    address: String,
    postal_code: Number,
    enterprise: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'enterprise'
    }
})

module.exports = mongoose.model('branchOffice', schema)