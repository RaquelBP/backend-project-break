const { getAuth, onAuthStateChanged } = require('firebase/auth')
const { app } = require('../config/firebase')
const auth = getAuth(app);

const monitorAuthState = (req, res, next) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user);
      next();
    } else {
      res.redirect('/login')
    }
  });
};

module.exports = {
  monitorAuthState
};
