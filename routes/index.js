const { getAllCategories, createCategory, deleteCategory } = require("../controllers/categoryControllers")
const { getAllProducts, createProduct, deleteProduct, changeToFavorite, getProductByID, updateProduct } = require("../controllers/productController")
const { register, getAllUsers, changeToAdmin, getUserByID, deleteUser, login, updateUser} = require("../controllers/userController")

const router = require ("express").Router()

// Users Routes
router.get("/user", getAllUsers)
router.get("/user/:id", getUserByID)
router.delete("/user/:id", deleteUser)
router.put("/user/:id", updateUser)
router.post("/register", register)
router.post("/login", login)
router.put("/admin/:id", changeToAdmin)

//Categorys Routes
router.get("/categories", getAllCategories)
router.post("/category", createCategory)
router.delete("/category/:id", deleteCategory)

//Products Routes
router.get("/products", getAllProducts)
router.get("/product/:id", getProductByID)
router.post("/product",  createProduct)
router.delete("/product/:id", deleteProduct)
router.put("/product/:id", changeToFavorite)
router.put("/product/:id", updateProduct)

module.exports = router