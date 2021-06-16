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
    // Pas besoin de rajouter la clé étrangère ici ? Envoyer par défaut avec la relation Post.belongsTo(User);
    imageUrl: {
        type: DataTypes.STRING, 
    }
});

module.exports = Post;