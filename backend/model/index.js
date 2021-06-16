const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
// Rajouter ici les relations

Post.belongsTo(User);

Post.hasMany(Comment);

Comment.belongsTo(User);

// Un fois les models terminés, remplacer force par alter
User.sync({alter: true});
Post.sync({alter: true});
Comment.sync({alter: true});

module.exports = { User, Post, Comment };