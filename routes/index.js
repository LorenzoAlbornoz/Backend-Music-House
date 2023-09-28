const { getAllCategories, createCategory, deleteCategory } = require("../controllers/categoryControllers")
const { register, getAllUsers, changeToAdmin, getUserByID, deleteUser, login, updateUser} = require("../controllers/userController")

const router = require ("express").Router()

// User Routes
router.get("/user", getAllUsers)
router.get("/user/:id", getUserByID)
router.delete("/user/:id", deleteUser)
router.put("/user/:id", updateUser)
router.post("/register", register)
router.post("/login", login)
router.put("/admin/:id", changeToAdmin)

//Category Routes
router.get("/categories", getAllCategories)
router.post("/category", createCategory)
router.delete("/category/:id", deleteCategory)

module.exports = router