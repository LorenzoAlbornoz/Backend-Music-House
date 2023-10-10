const mongoose = require("mongoose");
const Category = require("./categorySchema");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true 
    },
    description: {
        type: String,
        required:true 
    },
    price: { 
        type: Number,
        required:true 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category
    },
    image: {
        type: String
    },
    stock: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0; 
            },
            message: "El stock debe ser mayor que 0" 
        }
    },
    isFeatured: {
        type: Boolean,
        default: false 
    },
    isFavorite: {
        type: Boolean,
        default: false 
    },
    shortDescription:{
    type: String,
    require: true
    }
})
;



const Product = mongoose.model("Product", productSchema)
module.exports = Product;

