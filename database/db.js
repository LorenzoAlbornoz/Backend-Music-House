const mongoose = require ("mongoose")

const mongoDBConnection = async () => {
    try{
    await mongoose.connect(process.env.MONGODB_CONNECTION, {
        dbName: "Comision49i",
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Base de datos conectada")
    }catch (error){
    console.log(error)
    process.exit(1)
    }
}

module.exports = mongoDBConnection;