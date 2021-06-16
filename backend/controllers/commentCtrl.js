// Imports
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const { Comment, Post, User } = require('../model/index');

// Actions
exports.getAllComment = (req, res, next) => {
    Comment.findAll({ include: Post })
        .then(listComment => {
            res.status(200).json(listComment);
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    Comment.findOne({
        where: { id: req.params.id }
    })
        .then(theComment => {
            res.status(200).json(theComment);
        })
        .catch(error => res.status(500).json({ error }));
};


exports.createComment = (req, res, next) => {
    const userComment =  req.body.comment;
    Comment.create({
        ...userComment
    })
        .then(() => {
            res.status(201).json({
                message: 'Commentaire enregistré !'
            })
        })
        .catch((err) => {
            res.status(500).json({ 'error': 'Une erreur s est produite !' });
        })
}

/*
exports.modifyComment = (req, res, next) => {
    // On souhaite récupére le post
    Comment.findOne({
        where: { id: req.params.id }
    })
        .then(theComment => {
            if (theComment.UserId != req.token.userId && !req.token.isAdmin) {
                res.status(403).json({ 'error': 'Action interdite !' });
            } else {
                theComment = Object.assign(theComment, req.body.comment);
                theComment.save()
                    .then(() => {
                        res.status(201).json({
                            message: 'Commentaire modifié !'
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({ 'error': 'Une erreur s est produite !' });
                    })
            }
        })
}
*/
exports.deleteComment = (req, res, next) => {
    Comment.findOne({
        where: { id: req.params.id }
    })
        .then(theComment => {
            if (thePost.UserId != req.token.userId || req.token.isAdmin == true) {
                res.status(403).json({ 'error': 'Action interdite !' });
            } else {
                theComment.destroy()

                .then(() => {
                    res.status(200).json({
                        message: 'Commentaire supprimé !'
                    })
                })
                .catch((err) => {
                    res.status(500).json({ 'error': 'Une erreur s est produite !' });
                }) 
            }
            
        })
        
}
