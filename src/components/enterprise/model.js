const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    enterprise_name: String,
    email: String,
    password: String,
    description: String,
    employment_cuantity: {
        type: Number,
        required: false,
        default: 0
    }
})

module.exports = mongoose.model('enterprise', schema)