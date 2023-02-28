const Auth = (req, res, next) => {
    // If the session doesn't include a userId refresh the page to the login
    if (!req.session.userId) {
      res.redirect("/login");
    } else {
    // If not continue on to the next step
      next();
    }
  };
  
  module.exports = Auth;