const mongoose = require ("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "El nombre es obligatorio"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
