const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
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
let Pruduct = mongoose.model("Product" , productSchema , "prudcts");
module.exports = Pruduct;


