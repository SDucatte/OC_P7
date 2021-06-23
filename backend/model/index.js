const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// Ajout des relations
Post.belongsTo(User);

Post.hasMany(Comment);

Comment.belongsTo(User);

// Suppression en cascade
User.hasMany(Post, {onDelete: 'cascade'});
User.hasMany(Comment, {onDelete: 'cascade'});

// Synchronisation automatique
User.sync({alter: true});
Post.sync({alter: true});
Comment.sync({alter: true});

module.exports = { User, Post, Comment };