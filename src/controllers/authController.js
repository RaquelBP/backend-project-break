const { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, AuthErrorCodes } = require('firebase/auth');
const { app } = require('../config/firebase');
const { baseHtml, getNavBar } = require('../controllers/productController')

const auth = getAuth(app);

const showLoginForm = (req, res) => {
    const loginForm = `
    <h2>Iniciar Sesión</h2>
    <form action="/login" method="post">
      <label for="login-email">Email:</label>
      <input type="email" id="login-email" name="email" required><br>
      <label for="login-password">Contraseña:</label>
      <input type="password" id="login-password" name="password" required><br>
      <button type="submit">Iniciar sesión</button>
    </form>

    <h2>Crear Cuenta</h2>
    <form action="/signup" method="post">
      <label for="signup-email">Email:</label>
      <input type="email" id="signup-email" name="email" required><br>
      <label for="signup-password">Contraseña:</label>
      <input type="password" id="signup-password" name="password" required><br>
      <button type="submit">Crear Cuenta</button>
    </form>

    <h2>Cerrar sesión</h2>
    <form action="/logout" method="post">
      <button type="submit">Logout</button>
    </form>
  `
    bodyPlaceholder = getNavBar() + loginForm

    let html = baseHtml(bodyPlaceholder, "Login")

    //console.log("ErrorMiddlewareActivo")
    res.send(html)
};

const loginEmailPassword = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      console.log(auth)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCredential.user)
      res.redirect('/dashboard')
    } catch (error) {
      //console.log(error)
      if (error.code === "auth/invalid-credential"){ //Si el código del error es de credenciales, lanza error de credenciales incorrecats
        next({ message: "Credenciales incorrectas", status: 401 })
      } else {
        next(error)
      }
    }
  };
  
  const createAccount = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log(userCredential.user)
      res.redirect('/dashboard')
    } catch (error) {
      if (error.code === "auth/weak-password"){ 
        next({ message: "La contraseña tiene que tener al menos 6 caracteres", status: 403 })
      } else {
        next(error)
      }
    }
  };
  
  const logout = async (req, res, next) => {
    try {
      await signOut(auth)
      res.redirect('/products');
    } catch (error) {
      next(error)
    }
  };
  

module.exports = {
  showLoginForm,
  loginEmailPassword,
  createAccount,
  logout
};