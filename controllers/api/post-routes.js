// Import Post model and Authenticator function
const router = require('express').Router();
const { Post } = require('../../models/');
const Auth = require('../../utils/auth');

router.post('/', Auth, async (req, res) => {
  const body = req.body;

  try {
    // Create a new post
    const newPost = await Post.create({ 
        ...body, 
        userId: req.session.userId 
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', Auth, async (req, res) => {
try {
    // Get the array of posts with the matching id
    const [Rows] = await Post.update(req.body, {
        where: {
        id: req.params.id,
        },
    });
    // If there is more than 0 rows there is indeed a post
    if (Rows > 0) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
    } catch (err) {
    res.status(500).json(err);
    }
});

router.delete('/:id', Auth, async (req, res) => {
try {
    // Delete the post with the matching id from the url
    const [Rows] = Post.destroy({
        where: {
        id: req.params.id,
        },
    });
    // Make sure there is indeed at least 1 post
    if (Rows > 0) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
    } catch (err) {
    res.status(500).json(err);
    }
});

module.exports = router;
  