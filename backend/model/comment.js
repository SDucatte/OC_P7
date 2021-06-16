// Import
const bdd = require('./connexion');
const DataTypes = require('sequelize');

// Model

const Comment = bdd.define('Comment', {
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Comment;