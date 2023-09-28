const { register, getAllUsers, changeToAdmin, getUserByID, deleteUser, login, updateUser} = require("../controllers/userController")

const router = require ("express").Router()

// user routes
router.get("/user", getAllUsers)
router.get("/user/:id", getUserByID)
router.delete("/user/:id", deleteUser)
router.put("/user/:id", updateUser)
router.post("/register", register)
router.post("/login", login)
router.put("/admin/:id", changeToAdmin)

module.exports = router