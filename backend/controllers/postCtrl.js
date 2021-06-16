// Imports
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// const { and } = require('sequelize/types');

const { Post, User, Comment } = require('../model/index');

// Actions 

//  Récupération de tous les posts
exports.getAllPost = (req, res, next) => {
    Post.findAll({
        include: { all: true, nested: true },
        order: [
            ["createdAt", "DESC"]
        ]
    })
        .then(listPost => {
            res.status(200).json(listPost);
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id }
    })
        .then(thePost => {
            res.status(200).json(thePost);
        })
        .catch(error => res.status(500).json({ error }));
};

exports.createPost = (req, res, next) => {
    // Récupération Données du Post
    const userPost = JSON.parse(req.body.post);
    if (req.file != undefined) {
        userPost.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    Post.create({
        ...userPost
    })
        .then(() => {
            res.status(201).json({
                message: 'Post enregistré !'
            })
        })
        .catch((err) => {
            res.status(500).json({ 'error': 'Une erreur s est produite !' });
        })
}

exports.modifyPost = (req, res, next) => {
    // On souhaite récupére le post
    Post.findOne({
        where: { id: req.params.id }
    })
        .then(thePost => {
            if (thePost.UserId != req.token.userId && !req.token.isAdmin) {
                res.status(403).json({ 'error': 'Action interdite !' });
            } else {
                thePost = Object.assign(thePost, req.body.post);
                thePost.save()
                    .then(() => {
                        res.status(201).json({
                            message: 'Post modifié !'
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({ 'error': 'Une erreur s est produite !' });
                    })
            }
        })
        .catch((err) => {
            res.status(500).json({ 'error': 'Une erreur s est produite !' });
        })
}

exports.deletePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id }
    })
        .then(thePost => {
            /* 
            Comment vérifier la condition la condition isAdmin ? 
            (thePost.UserId != req.token.userId && !req.token.isAdmin)
            Par défaut, utilisateur isAdmin = false

            Test de suppression de post avec un autre utilisateur, 
            Alerte l'erreur 500 du catch, mais dans la console affiche bien l'erreur 403
            */
            if (thePost.UserId != req.token.userId || req.token.isAdmin == true) {
                res.status(403).json({ 'error': 'Action interdite !' });
            } else {
                thePost.destroy()
                    .then(() => {
                        res.status(200).json({
                            message: 'Post supprimé !'
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({ 'error': 'Une erreur s est produite !' });
                    });
            }

        })

}