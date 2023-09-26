const { register, getAllUsers, changeToAdmin} = require("../controllers/userController")

const router = require ("express").Router()

router.get("/user", getAllUsers)
router.post("/user/register", register)
router.put("admin/:id", changeToAdmin)

module.exports = router