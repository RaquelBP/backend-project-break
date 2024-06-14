const { getAuth, onAuthStateChanged } = require('firebase/auth')
const { app } = require('../config/firebase')
const auth = getAuth(app);

const monitorAuthState = (req, res, next) => {
  const unsubscribe = onAuthStateChanged(auth, user => {
    unsubscribe()
    if (user) {
      console.log(user)
      next();
    } else {
      res.redirect('/login')
    }
  });
};

module.exports = {
  monitorAuthState
};
