const { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, AuthErrorCodes } = require('firebase/auth');
const { app } = require('../config/firebase');

const { baseHtml, getNavBar, errorHandler } = require('../controllers/productController')

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
    <a href="/products">Products</a>
  `;
  res.send(loginForm);
};

const loginEmailPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
      console.log(auth)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user)
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error)
      res.error = error;
      errorHandler(req, res);
    }
  };
  
  const createAccount = async (req, res) => {
    const { email, password } = req.body;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user)
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error)
      res.error = error;
      errorHandler(req, res);
    }
  };
  
  const logout = async (req, res) => {
    try {
      await signOut(auth);
      res.redirect('/products');
    } catch (error) {
      console.log(error)
      res.error = error;
      errorHandler(req, res);
    }
  };
  

module.exports = {
  showLoginForm,
  loginEmailPassword,
  createAccount,
  logout
};