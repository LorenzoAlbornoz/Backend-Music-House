const mongoose = require ("mongoose")

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
    repassword:{
        type: String,
        require: true,
        trim: [true, "Tiene espacios"]
    },
    rol: {
        type:String,
        default: "user",
        enum: ["user", "admin"]
    }
})

const User = mongoose.model("User", userSchema)
module.exports = User;