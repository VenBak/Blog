// Import the Post model and the Authenticator function
const router = require('express').Router();
const { Post } = require('../models');
const Auth = require('../utils/auth');

// Runs the Authenticator function before running in order to make sure the user is in fact logged in
router.get('/', Auth, async (req, res) => {
  try {
    // Find all the posts from the database where the userId matches the one from our current user
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      }
    });

    // Create a new array from all the posts of our database and convert to readable javascript
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the all-posts handlebars page
    res.render('all-posts-main', {
        // Change the layout from the main to the dashboard layout with the posts data
        layout: 'dashboard', posts
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/edit/:id', Auth, async (req, res) => {
  try {
    // Find the specific post from the database with the matching id URL
    const postData = await Post.findByPk(req.params.id);

    // If there is one translate it to readable js
    if (postData) {
      const post = postData.get({ plain: true });
        
      // Render edit-post handlebars page with the layout as the dashboard with the post data
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.json(err);
  }
});

// If the user clicks the create a new post
router.get('/new', Auth, (req, res) => {
    // Render the new-post handlebars page
    res.render('new-post', {
        layout: 'dashboard',
    });
});

module.exports = router;