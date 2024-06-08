const mongoose = require('mongoose');
// const User = require('./user');

const orderSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
});

let Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;