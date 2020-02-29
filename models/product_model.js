const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: false
    }
});
const product_model = mongoose.model('productmodel', product_schema);

module.exports = product_model;