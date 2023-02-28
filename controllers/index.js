// Declare router
const router = require('express').Router();

// Import the different routes, both the api and regualar 
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');
const homeRoutes = require('./home-routes.js');

// Invoke the routes to the router
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);


module.exports = router;