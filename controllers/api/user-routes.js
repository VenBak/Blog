// Import the user model
const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {

        // Create a new User and send it to the database
        const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        });

        // Save the userId, username and a boolean of whether they are logged in to the session
        req.session.save(() => {
        req.session.userId = newUser.id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;
        res.json(newUser);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// If the user clicks on login
router.post('/login', async (req, res) => {
    try {
        // From the database find where the username matches the one by the user
      const userData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      
      // If there is no username under the one given send back a message
      if (!userData) {
        res.status(400).json({ 
            message: 'No user'
        });
        return;
      }
      
      // Check the password given by the user to make sure it exists
      const validPassword = userData.checkPassword(req.body.password);
      
      // If it doesn't exist send back a message
      if (!validPassword) {
        res.status(400).json({ 
            message: 'No user'
        });
        return;
      }
      
      // If there is a username and password save their data in the session
    req.session.save(() => {
        req.session.userId = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json({ userData, message: 'You logged in' });
    });
    
    } catch (err) {
      res.status(400).json({ message: 'No user' });
    }
});

module.exports = router;