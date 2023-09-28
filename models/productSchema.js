const mongoose = require("mongoose");
const Category = require("./categorySchema");

const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category
    },
    image: {
        type: String
    },
    stock: {
        type: Number
    },
    favorite: {
        type: Boolean,
        default: false
    }
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product;
