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

//  Récupération d'un post
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id }
    })
        .then(thePost => {
            res.status(200).json(thePost);
        })
        .catch(error => res.status(500).json({ error }));
};

//  Création d'un post
exports.createPost = (req, res, next) => {
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

// Modification d'un post
exports.modifyPost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id }
    })
        .then(thePost => {
            if (thePost.UserId != req.token.userId && !req.token.isAdmin) {
                res.status(403).json({ 'error': 'Action interdite !' });
            } else {
                thePost = Object.assign(thePost, JSON.parse(req.body.post));
                if (req.file != undefined) {
                    thePost.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                }
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

// Suppression d'un post
exports.deletePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id }
    })
        .then(thePost => {
            if (thePost.UserId != req.token.userId && !req.token.isAdmin) {
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
        .catch((err) => {
            res.status(500).json({ 'error': 'Une erreur s est produite !' });
        });
}