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
        type: String,
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
        required:true 
    },
    favorite: {
        type: Boolean,
        default: false
    }
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product;
