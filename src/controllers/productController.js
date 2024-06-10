/*
------showProducts: Devuelve la vista con todos los productos.
showProductById: Devuelve la vista con el detalle de un producto.
---------showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
-createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
showEditProduct: Devuelve la vista con el formulario para editar un producto.
updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.
*/
const Product = require("../models/Product");

let bodyPlaceholder

//FUNCIONES
function baseHtml(){
    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/public/styles.css">
            <title>Products</title>
        </head>
        <body>
          ${bodyPlaceholder}  
        </body>
        </html>

    `
    return html;
}

function getNavBar(){
    let html = `
        <ul>
            <li><a href="/products">Products</a></li>
            <li><a href="/products/camisas">Camisas</a></li>
            <li><a href="/products/pantalones">Pantalones</a></li>
            <li><a href="/products/zapatos">Zapatos</a></li>
            <li><a href="/products/accesorios">Accesorios</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/dashboard/new">New Product</a></li>
        </ul>

        `
    return html;
}

//Tarjetas para todos los productos
function getProductCards(products) {
    let html = '';
    for (let product of products) {
      html += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>${product.price}€</p>
          <a href="/products/${product._id}">Ver detalle</a>
        </div>
      `;
    }
    return html;
}
//Tarjetas para todos los productos en Dashboard
function getProductCardsDash(products) {
    let html = '';
    for (let product of products) {
      html += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>${product.price}€</p>
          <a href="/dashboard/${product._id}">Ver detalle</a>
        </div>
      `;
    }
    return html;
}

//Tarjeta para UN producto
function getProductCard(product) {
    let html = '';
    html += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>${product.price}€</p>
        </div>
    `;
    return html;
}

//Tarjeta para UN productos en Dashboard
function getProductCardDash(product) {
    let html = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>${product.price}€</p>
          <button type="button">Update</button>

        <form action="/dashboard/${product.id}/delete" method="post">
            <input type="hidden" name="action" value="delete">
            <input type="submit" value="Delete">
        </form>

          
        </div>
    `;
    return html;
}

function createForm(){
    let html = `
        <form action="/dashboard" method="post">
            <label for="pname">Product name:</label>
            <input type="text" id="pname" name="pname"><br><br>

            <label for="pdescription">Description:</label>
            <input type="text" id="pdescription" name="pdescription"><br><br>

            <label for="pimage">Image Link:</label>
            <input type="text" id="pimage" name="pimage"><br><br>
            
            <label for="pcategory">Category:</label>
            <select id="pcategory" name="pcategory">
                <option value="camisetas">Camisetas</option>
                <option value="pantalones">Pantalones</option>
                <option value="zapatos">Zapatos</option>
                <option value="accesorios">Accesorios</option>
            </select><br><br>

            <label for="psize">Size:</label>
            <select id="psize" name="psize">
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select><br><br>

            <label for="pprice">Price:</label>
            <input type="number" id="pprice" name="pprice"><br><br>

            <input type="submit" value="Submit">
        </form>
    `
    return html
}

function editForm(product) {
    let html = `
        <form method="post" action="/dashboard/${product._id}?_method=PUT" >
            

            <label for="pname">Product name:</label>
            <input type="text" id="pname" name="pname" value="${product.name}"><br><br>

            <label for="pdescription">Description:</label>
            <input type="text" id="pdescription" name="pdescription" value="${product.description}"><br><br>

            <label for="pimage">Image Link:</label>
            <input type="text" id="pimage" name="pimage" value="${product.image}"><br><br>
            
            <label for="pcategory">Category:</label>
            <select id="pcategory" name="pcategory">
                <option value="camisetas" ${product.category === 'camisetas' ? 'selected' : ''}>Camisetas</option>
                <option value="pantalones" ${product.category === 'pantalones' ? 'selected' : ''}>Pantalones</option>
                <option value="zapatos" ${product.category === 'zapatos' ? 'selected' : ''}>Zapatos</option>
                <option value="accesorios" ${product.category === 'accesorios' ? 'selected' : ''}>Accesorios</option>
            </select><br><br>

            <label for="psize">Size:</label>
            <select id="psize" name="psize">
                <option value="XS" ${product.size === 'XS' ? 'selected' : ''}>XS</option>
                <option value="S" ${product.size === 'S' ? 'selected' : ''}>S</option>
                <option value="M" ${product.size === 'M' ? 'selected' : ''}>M</option>
                <option value="L" ${product.size === 'L' ? 'selected' : ''}>L</option>
                <option value="XL" ${product.size === 'XL' ? 'selected' : ''}>XL</option>
            </select><br><br>

            <label for="pprice">Price:</label>
            <input type="number" id="pprice" name="pprice" value="${product.price}"><br><br>

            <input type="submit" value="Submit">
        </form>
    `; //Operadores ternarios para checkear qué opciones están marcadas
    return html;
}

//CONTROLADORES
const showProducts = async (req, res) => {
    try{
        const products = await Product.find();
        let html
        if(req.url.includes("/dashboard")){ //Checkea si estamos en dashboard o no
            const productCards = getProductCardsDash(products);
            bodyPlaceholder = getNavBar() + productCards
            html = baseHtml()
            //+ getNavBar() + productCards;
        }else{
            const productCards = getProductCards(products);
            bodyPlaceholder = getNavBar() + productCards
            html = baseHtml()
            //+ getNavBar() + productCards;
        }
        
        res.send(html);}
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get products" });
    }
};

const showProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        let html
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        if(req.url.includes("/dashboard")){ //Checkea si estamos en dashboard o no
            const productCardDash = getProductCardDash(product);
            bodyPlaceholder = getNavBar() + productCardDash
            html = baseHtml()

        } else {
            const productCard = getProductCard(product);
            bodyPlaceholder = getNavBar() + productCard
            html = baseHtml()
        }
        res.send(html);}
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get the product" });
    }
};


const showNewProduct = async(req, res) => {
    try {
        bodyPlaceholder = createForm()
        const html = baseHtml()
        res.send(html);
    }

    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the form" });
        }
}


const createProduct = async(req, res) => {
    try {
        console.log(req.url) //Cheack si viene de dashboard o no
        const infoFormulario = ''
        const product = await Product.create(
        
        {
            "name": req.body.pname,
            "description": req.body.pdescription,
            "image": req.body.pimage,
            "category": req.body.pcategory,
            "size": req.body.psize,
            "price": req.body.pprice
          }
        
        );

        const productCardDash = getProductCardDash(product);
        bodyPlaceholder = getNavBar() + productCardDash
        html = baseHtml()
        res.redirect('/dashboard');
    }
        //res.status(201).send(product);}

    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a product" });
}}


const editProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        bodyPlaceholder = editForm(product)
        const html = baseHtml()
        res.send(html);
    }

    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the form" });
        }
}



const updateProduct = async (req, res) => {
    try {
        const { title } = req.body;

        const product = await Product.findByIdAndUpdate(req.params.id, { title }, { new: true });
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to update the product" });
    }
}



const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to delete the product" });
    }
}




module.exports = {
    showProducts, showProductById, showNewProduct, createProduct, editProduct, updateProduct, deleteProduct
};

