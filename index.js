require("dotenv").config();
const express = require ("express");
const cors = require ("cors")
const morgan = require ("morgan");
const router = require("./routes")

const app = express();
const mongoDBConnection = require("./database/db");

//Middlewares
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

//Configuracion rutas
app.use(process.env.API, router)

//Puerto
const port = process.env.PORT

//Conexion base de datos
mongoDBConnection()

app.listen(port, () => {
    console.log(`mi servidor esta funcionando en el puerto ${port}`)
})