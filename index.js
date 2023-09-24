const express = require ("express");
const cors = require ("cors")
const morgan = require ("morgan");
const router = require("./routes")

const app = express();

//middlewares
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.use("/", router)

const port = 8080

app.listen(port, () => {
    console.log(`mi servidor esta funcionando en el puerto ${port}`)
})