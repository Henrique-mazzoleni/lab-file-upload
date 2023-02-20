// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
  console.log('checkiing if logged in',req.session)
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
};

// if an already logged in user tries to access the login page it
// redirects the user to the home page
const isLoggedOut = (req, res, next) => {
  console.log('checking if logged out', req.session)
  if (req.session.currentUser) {
    return res.redirect("/");
  }
  next();
};

// export the functions to make them available to be used wherever we need them
// (we just need to import them to be able to use them)

module.exports = {
  isLoggedIn,
  isLoggedOut
};
