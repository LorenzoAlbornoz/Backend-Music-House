const { register} = require("../controllers/userController")

const router = require ("express").Router()

router.post("/user/registrar", register)

module.exports = router