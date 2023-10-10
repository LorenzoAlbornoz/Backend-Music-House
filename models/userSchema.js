const mongoose = require ("mongoose")
const Product = require("./productSchema");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true,
        trim: true,
    },
    username:{
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
        trim: [true, "Tiene espacios"]
    },
    rol: {
        type:String,
        default: "user",
        enum: ["user", "admin"]
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Product
        },
    ],
})

const User = mongoose.model("User", userSchema)
module.exports = User;