/*
GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
GET /products/:productId: Devuelve el detalle de un producto.

GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
POST /dashboard: Crea un nuevo producto.
GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
PUT /dashboard/:productId: Actualiza un producto.
DELETE /dashboard/:productId/delete: Elimina un producto.
*/


const { showProducts, showProductById, showProductByCategory, showNewProduct, createProduct, editProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { errorMiddleware } = require("../middlewares/errorMiddleware")

const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); 

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
router.get("/dashboard", showProducts);

//Nuevo Producto Formulario
router.get("/dashboard/new", showNewProduct)

//Detalles de producto por ID
router.get("/dashboard/:id", showProductById);

//CREAR producto
router.post("/dashboard", createProduct);

// Formulario editar producto
router.get("/dashboard/:id/edit", editProduct);

// Actualizar el producto por ID
router.put("/dashboard/:id/", updateProduct);


// Eliminar una tarea por ID
//router.delete("/dashboard/:id/delete", deleteProduct);
router.delete("/dashboard/:id/delete", deleteProduct);


//router.use( errorMiddleware );


module.exports = router;


/*
router.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get the product" });
    }
});
*/




/*
CREAR TAREA
async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).send(product);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a product" });
}}

*/



/*
// MARK AS COMPETE
router.put("/markAsCompleted/:id", async (req, res) => {
    try {
        const { completed } = req.body;
        if (typeof completed === 'undefined') {
            return res.status(400).send({ message: "Completed field is required" });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { completed }, { new: true });
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to update the product" });
    }
});
*/



/*
router.put("/dashboard/:id", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).send({ message: "Title field is required" });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { title }, { new: true });
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to update the product" });
    }
});
*/


/*
// Eliminar una tarea por ID
router.delete("/id/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to delete the product" });
    }
});
*/


