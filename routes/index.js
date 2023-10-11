const { getAllCategories, createCategory, deleteCategory } = require("../controllers/categoryControllers")
const { getAllProducts, createProduct, deleteProduct, getProductByID, updateProduct, toggleProductFeaturedStatus } = require("../controllers/productController")
const { register, getAllUsers, changeToAdmin, getUserByID, deleteUser, login, updateUser, recoverPassword, getFavoriteProducts, addToFavorites} = require("../controllers/userController")
const authenticateAdmin = require("../middlewares/authAdmin")
const authenticateUser = require("../middlewares/authUser")
const upload = require ("../middlewares/multer")

const router = require ("express").Router()

// Users Routes
router.get("/user", authenticateAdmin, getAllUsers)
router.get("/user/:id", authenticateAdmin, getUserByID)
router.delete("/user/:id", authenticateAdmin, deleteUser)
router.put("/user/:id", authenticateUser, updateUser)
router.put("/admin/rol/:id", authenticateAdmin, changeToAdmin)
router.post("/register", register)
router.post("/login", login)
router.post("/recoverPassword", recoverPassword)
router.post("/user/favorite/:id", addToFavorites)
router.get("/favorite/:id", authenticateUser, getFavoriteProducts)

//Categorys Routes
router.get("/categories", getAllCategories)
router.post("/category", authenticateAdmin, createCategory)
router.delete("/category/:id", authenticateAdmin, deleteCategory)

//Products Routes
router.get("/products", getAllProducts)
router.get("/product/:_id", getProductByID)
router.post("/product", authenticateAdmin, upload.single("image"), createProduct)
router.delete("/product/:id", authenticateAdmin, deleteProduct)
router.put("/product/:id", authenticateAdmin, updateProduct)
router.put("/product/feacture/:id", authenticateAdmin, toggleProductFeaturedStatus)

module.exports = router