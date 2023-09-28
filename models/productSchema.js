const mongoose = require ("mongoose");
const Category = require("./categorySchema");

const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    image:{
        type: String
    },
    detail:{
        type: String
    },
    price:{
        type: String
    },
    category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category
}
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product;
