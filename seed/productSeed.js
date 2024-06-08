const db = require("../config/database")
const Product = require("../models/product")

// run thiis file to save products
//examlpe not real
let Pruducts = [

    
    new Product({
        image: "path.png",
        
        price: 1500,
        type: "watch"

    }) ,
    new Product({
        image: "path",
        
        price: 1500,
        type: "watch"

    }),
    

];
Pruducts.forEach((p)=>{
    try {
    p.save();
    } catch (error) {
        console.log(error)
    }
    
})
