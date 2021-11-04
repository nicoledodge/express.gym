const withAuth = (req, res, next) => {
    // If the user isn't logged in, redirect them to the login route
    if (req.session.logged_in) {
      console.log("WITHAUTH FIRING________________________________________")
      next();
    } else {
      
      res.redirect('/login');
    }
  };
  
  module.exports = withAuth;
  