// Import the models and the express router
const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

router.get('/', async (req, res) => {
  try {
    // Get all the posts and make sure to include the User
    const postData = await Post.findAll({include: [User]});

    // Make an array from all the posts
    const Allposts = postData.map((post) => post.get({ plain: true }));

    // Send that array to the handlebars in order to render all the posts from the all-posts handlebars file
    res.render('all-posts', { Allposts });
  } catch (err) {

    // Catch the error if there is one
    res.status(500).json(err);
  }
});

// After the user clicks the login button 
router.get('/login', (req, res) => {
    // If the session has loggedIn set to to true in the session redirect the user to the main page
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Else render the login handlebars view
    res.render('login');
});

// After the user clicks on the signup button
router.get('/signup', (req, res) => {
    // If the session has loggedIn set to to true in the session redirect the user to the main page
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // If not render the signup handlebars view
    res.render('signup');
});

// After the user clicks on a specific post
router.get('/post/:id', async (req, res) => {
    try {
        // Find the post with the same id as the one from the url
      const postData = await Post.findByPk(req.params.id, 
        // Include the associated options
        {include: 
            [User,{ model: Comment, include: [User]}],
      });
      
      // If there is an associated post to the user 
      if (postData) {
        const post = postData.get({ plain: true });
        // Render the single-post handlebars
        res.render('single-post', { post });
      }
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;