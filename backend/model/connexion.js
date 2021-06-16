const { Sequelize } = require('sequelize');

const bdd = new Sequelize('bddgroupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

bdd.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

module.exports = bdd;