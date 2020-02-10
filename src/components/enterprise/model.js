const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    enterprise_name: String,
    description: String,
})

module.exports = mongoose.model('enterprise', schema)