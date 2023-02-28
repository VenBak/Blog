const Comment = require('./Comment');
const User = require('./User');
const Post = require('./Post');

// Explain the relationships between the models

// Comment belongs To user 
Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

// Post belongs to User
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// A Post has many comments
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };