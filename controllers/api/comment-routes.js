// Import the models and the authenticator function
const router = require('express').Router();
const { Comment } = require('../../models/');
const Auth = require('../../utils/auth');


router.post('/', Auth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;