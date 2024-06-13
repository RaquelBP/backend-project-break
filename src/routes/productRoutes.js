const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); 

const { showProducts, showProductById, showProductByCategory, showNewProduct, createProduct, editProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { monitorAuthState } = require('../middlewares/authMiddleware');
const { showLoginForm, loginEmailPassword, createAccount, logout } = require('../controllers/authController');


//----------ROOT
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get products" });
    }
});

//GET TODOS LOS PRODUCTOS
router.get("/products", showProducts);


// Obtener una tarea por ID
router.get("/products/:id", showProductById);

// Filtros
router.get("/products/filter/:category", showProductByCategory)

//Show dashboard
router.get("/dashboard", monitorAuthState, showProducts);

//Nuevo Producto Formulario
router.get("/dashboard/new", monitorAuthState, showNewProduct)

//Detalles de producto por ID
router.get("/dashboard/:id", monitorAuthState, showProductById);

//CREAR producto
router.post("/dashboard", monitorAuthState, createProduct);

// Formulario editar producto
router.get("/dashboard/:id/edit", monitorAuthState, editProduct);

// Actualizar el producto por ID
router.put("/dashboard/:id/", monitorAuthState, updateProduct);


// Eliminar una tarea por ID
//router.delete("/dashboard/:id/delete", deleteProduct);
router.delete("/dashboard/:id/delete", monitorAuthState, deleteProduct);



// Ruta para mostrar el formulario de inicio de sesión
router.get("/login", showLoginForm);

// Rutas para manejar el login y la creación de cuentas
router.post("/login", loginEmailPassword);
router.post("/signup", createAccount);

router.post("/logout", logout);


module.exports = router;
