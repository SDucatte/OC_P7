// Import
const bdd = require('./connexion');
const DataTypes = require('sequelize');

// Model
const Post = bdd.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },

    imageUrl: {
        type: DataTypes.STRING, 
    }
});

module.exports = Post;