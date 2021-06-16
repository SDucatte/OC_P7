// Import
const bdd = require('./connexion');
const DataTypes = require('sequelize');

// Model
const User = bdd.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }, 
    isDisable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = User;