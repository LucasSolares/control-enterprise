const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    enterprise: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'enterprise'
    },
    name: String,
    description: String,
    cuantity: Number,
})

module.exports = mongoose.model('product', schema)