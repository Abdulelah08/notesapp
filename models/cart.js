const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({

    price:{
        type: Number,
        require: true
    },
    image:{
        type: String,
        require: true
    },
    type:{
        type: String,
        require: true
    },

});
// creat a custroctur of Product scheama
let Cart = mongoose.model("Cart" , cartSchema , "cart");
module.exports = Cart;