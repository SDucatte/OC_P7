const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// Ajout des relations
Post.belongsTo(User);

Post.hasMany(Comment);

Comment.belongsTo(User);

// Synchronisation automatique
User.sync({alter: true});
Post.sync({alter: true});
Comment.sync({alter: true});

module.exports = { User, Post, Comment };