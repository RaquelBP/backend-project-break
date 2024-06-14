const Product = require("../models/Product");

let bodyPlaceholder

//FUNCIONES
function baseHtml(bodyPlaceholder, title){
    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="/styles.css">
            <title>${title}</title>
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
    <header>
        <nav>
            <ul>
                <div id="public">
                    <li><a href="/products">Products</a></li>
                    <li><a href="/products/filter/camisetas">Camisetas</a></li>
                    <li><a href="/products/filter/pantalones">Pantalones</a></li>
                    <li><a href="/products/filter/zapatos">Zapatos</a></li>
                    <li><a href="/products/filter/accesorios">Accesorios</a></li>
                </div>
                <div id="private">
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/dashboard/new">New Product</a></li>
                    <li><a href="/login">Sign in / Sign Up / Logout</a></li>
                </div>
            </ul>
        </nav>
    </header>
    `
    return html;
}
/*
//Función de error
function errorToHtml (req, res) {

    console.error(res.error.message);
    const statusCode = res.error.status || 500 //Si no hay status code asignado le pone 500

    const errorHtml = `
    <div class="error">
        <h1>Error ${statusCode}</h1>
        <p>${res.error.message}</p>
    </div>
    `
    bodyPlaceholder = getNavBar() + errorHtml

    let html = baseHtml(bodyPlaceholder)

    res.status(statusCode).send(html);

};
*/

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
          <a href="/products/${product._id}">Ver detalles</a>
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
          <a href="/dashboard/${product._id}">Administrar</a>
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
          <p><b>Size:</b> ${product.size}</p>
          <p><p><b>Price:</b> ${product.price}€</p>
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
          <p><b>Item Category:</b> ${product.category}</p>
          <p>${product.description}</p>
          <p><b>Size:</b> ${product.size}</p>
          <p><p><b>Price:</b> ${product.price}€</p>

            <form method="get" action="/dashboard/${product.id}/edit">
                <button type="submit">Actualizar producto</button>
            </form>

            <form method="post" action="/dashboard/${product.id}/delete?_method=DELETE">
                <button type="submit">Borrar producto</button>
            </form>

          
        </div>
    `;
    return html;
}

function createForm(){
    let html = `
    <div class="div-forms">
        <h2>Nuevo Producto</h2>
        <br>
        <form action="/dashboard" method="post">
            <div class="field-group">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name"><br><br>
            </div>

            <div class="field-group">
                <label for="description">Descripción:</label>
                <input type="text" id="description" name="description"><br><br>
            </div>

            <div class="field-group">
                <label for="image">Link de imagen:</label>
                <input type="text" id="image" name="image"><br><br>
            </div>
            
            <div class="field-group">
                <label for="category">Categoría:</label>
                <select id="category" name="category">
                    <option value="camisetas">Camisetas</option>
                    <option value="pantalones">Pantalones</option>
                    <option value="zapatos">Zapatos</option>
                    <option value="accesorios">Accesorios</option>
                </select><br><br>
            </div>

            <div class="field-group">
                <label for="size">Tamaño:</label>
                <select id="size" name="size">
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select><br><br>
            </div>

            <div class="field-group">
                <label for="price">Precio:</label>
                <input type="number" id="price" name="price"><br><br>
            </div>

            <button type="submit">Guardar</button>
        </form>
    </div>
    `
    return html
}

function editForm(product) {
    let html = `
    <div class="div-forms">
        <h2>Actualizar producto</h2>
        <br>
        <form method="post" action="/dashboard/${product._id}?_method=PUT" >
            
            <div class="field-group">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" value="${product.name}"><br><br>
            </div>

            <div class="field-group">
                <label for="description">Descripción:</label>
                <input type="text" id="description" name="description" value="${product.description}"><br><br>
            </div>

            <div class="field-group">
                <label for="image">Link de imagen:</label>
                <input type="text" id="image" name="image" value="${product.image}"><br><br>
            </div>

            <div class="field-group">
                <label for="category">Categoría:</label>
                <select id="category" name="category">
                    <option value="camisetas" ${product.category === 'camisetas' ? 'selected' : ''}>Camisetas</option>
                    <option value="pantalones" ${product.category === 'pantalones' ? 'selected' : ''}>Pantalones</option>
                    <option value="zapatos" ${product.category === 'zapatos' ? 'selected' : ''}>Zapatos</option>
                    <option value="accesorios" ${product.category === 'accesorios' ? 'selected' : ''}>Accesorios</option>
                </select><br><br>
            </div>

            <div class="field-group">
                <label for="size">Tamaño:</label>
                <select id="size" name="size">
                    <option value="XS" ${product.size === 'XS' ? 'selected' : ''}>XS</option>
                    <option value="S" ${product.size === 'S' ? 'selected' : ''}>S</option>
                    <option value="M" ${product.size === 'M' ? 'selected' : ''}>M</option>
                    <option value="L" ${product.size === 'L' ? 'selected' : ''}>L</option>
                    <option value="XL" ${product.size === 'XL' ? 'selected' : ''}>XL</option>
                </select><br><br>
            </div>

            <div class="field-group">
                <label for="price">Precio:</label>
                <input type="number" id="price" name="price" value="${product.price}"><br><br>
            </div>

            <button type="submit">Guardar</button>
        </form>
    </div>
    `; //Operadores ternarios para checkear qué opciones están marcadas
    return html;
}

//CONTROLADORES
const showProducts = async (req, res, next) => {
    try{
        const products = await Product.find();
        let html
        if(req.url.includes("/dashboard")){ //Checkea si estamos en dashboard o no
            const productCards = getProductCardsDash(products);
            bodyPlaceholder = getNavBar() + productCards
            html = baseHtml(bodyPlaceholder, "Dashboard: Productos")
            //+ getNavBar() + productCards;
        }else{
            const productCards = getProductCards(products);
            bodyPlaceholder = getNavBar() + productCards
            html = baseHtml(bodyPlaceholder, "Productos")
            //+ getNavBar() + productCards;
        }
        
        res.send(html);}
    catch (error) {
        next(error)
    }
};

const showProductById = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id);
        let html

        
        if (!product || !product.image) { //Si la id tiene el formato correcto, oero no corresponde a ningún producto
            throw new Error('ID not found')
        }

        if(req.url.includes("/dashboard")){ //Checkea si estamos en dashboard o no
            const productCardDash = getProductCardDash(product);
            bodyPlaceholder = getNavBar() + productCardDash
            html = baseHtml(bodyPlaceholder, `Dashboard: ${product.name}`)

        } else {
            const productCard = getProductCard(product);
            bodyPlaceholder = getNavBar() + productCard
            html = baseHtml(bodyPlaceholder, `Producto: ${product.name}`)
        }
        res.send(html);}
    catch (error) { //Id no tiene el formato correcto
        next(error)
    }
};

const showProductByCategory = async (req, res, next) => {
    try{
        //console.log("working")
        //console.log(req.params.category)
        const products = await Product.find({ category: req.params.category });

        //console.log(products)
        let html
        const categoriasDisponibles = ["camisetas", "pantalones", "zapatos", "accesorios"];
        if (!categoriasDisponibles.includes(req.params.category)) {
            throw new Error('Category not found')
        } else {
            //console.log("working")
            const productCard = getProductCards(products);
            bodyPlaceholder = getNavBar() + productCard
            html = baseHtml(bodyPlaceholder, `Categoría: ${req.params.category}`) 
        }
        res.send(html);
    }
        
    catch (error) {
        next(error)
    }
};


const showNewProduct = async(req, res, next) => {
    try {
        bodyPlaceholder = getNavBar() + createForm()
        const html = baseHtml(bodyPlaceholder, "Nuevo Producto")
        res.send(html);
    }

    catch (error) {
        next(error)
}}


const createProduct = async(req, res, next) => {
    try {
        //console.log(req.url) //Cheack si viene de dashboard o no
        //const infoFormulario = ''
        const { name, description, image, category, size, price  } = req.body;
        const product = await Product.create(
        
            { name, description, image, category, size, price  }
        
        );
        
        const productCardDash = getProductCardDash(product);
        bodyPlaceholder = getNavBar() + productCardDash
        html = baseHtml(bodyPlaceholder, "Nuevo Producto")
        res.redirect('/dashboard');
    }
        //res.status(201).send(product);}

    catch (error) {
        next(error)
}}


const editProduct = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        bodyPlaceholder = getNavBar() + editForm(product)
        const html = baseHtml(bodyPlaceholder, "Editar Producto")
        res.send(html);
    }

    catch (error) {
        next(error)
}}



const updateProduct = async (req, res, next) => {
    try {
        const { name, description, image, category, size, price  } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { name, description, image, category, size, price  }, { new: true, runValidators: true } ); //runValidator: True para que detecte los campos requeridos del esquema mongoose
        
        
        if (!product || !product.image) {
            throw new Error('Product not found')
        } else {
            const productCardDash = getProductCardDash(product);
            bodyPlaceholder = getNavBar() + productCardDash
            html = baseHtml(bodyPlaceholder, "Editar Producto")

            res.redirect('/dashboard');
        }

        
        //res.status(200).send(product);
    } catch (error) {
        next(error)
    }
}



const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product || !product.image) {
            throw new Error('Product not found')
        } else{
            res.redirect('/dashboard');
        }
        
    } catch (error) {
        next(error)
    }
}




module.exports = {
    showProducts, showProductById, showProductByCategory, showNewProduct, createProduct, editProduct, updateProduct, deleteProduct, baseHtml, getNavBar
};