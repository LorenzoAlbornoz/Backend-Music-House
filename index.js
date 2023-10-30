require("dotenv").config();
const express = require ("express");
const cors = require ("cors")
const morgan = require ("morgan");
const router = require("./routes")
const mongoDBConnection = require("./database/db");
const cloudinary = require("cloudinary").v2;
const jwtStrategy = require("./password/jwt");
const passport = require("passport");

const app = express();

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.APY_KEY,
    api_secret: process.env.APY_SECRET
});

passport.use("jwt", jwtStrategy)

app.use(process.env.API, router)

const port = process.env.PORT

mongoDBConnection()

app.listen(port, () => {
    console.log(`mi servidor esta funcionando en el puerto ${port}`)
})