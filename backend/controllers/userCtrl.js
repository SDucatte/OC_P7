// Imports
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { User } = require('../model/index');


// Actions 

// Création de l'utilsateur
exports.signup = (req, res, next) => {
  //  Regex ?

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      });

      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));

    })

    .catch(error => res.status(500).json({ error }));
};


// Connexion de l'utilisateur
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email }
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

      if (user.isDisable) {
        return res.status(401).json({ error: 'Compte désactivé !' });
      }

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              {
                userId: user.id,
                isAdmin: user.isAdmin
              },
              '3d2a5a16c34e1c1329b27c9512cd8f54',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error =>
      res.status(500).json({ error })
    );
};

// Affichage infos utilisateur

exports.account = (req, res, next) => {
  User.findOne({
    where: { id: req.token.userId }
  })
    .then(theAccount => {
      res.status(200).json(theAccount);

    })
    .catch((err) => {
      res.status(500).json({ 'error': 'Une erreur s est produite !' });
    })
};

// Désactivation du compte

exports.dropAccount = (req, res, next) => {
  User.findOne({
    where: { id: req.token.userId }
  })
    .then((user) => {
      user.isDisable = true;
      user.name = "compte supprimé",
        user.lastName = "",
        user.email = "",
        user.password = ""
      user.save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(500).json({ 'error': 'Une erreur s est produite !' });
        })
    })
    .catch((err) => {
      res.status(500).json({ 'error': 'Une erreur s est produite !' });
    })
};
/*
var name = req.body.name;
var lastName = req.body.lastName;
var email = req.body.email;
var password = req.body.password;
const regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (name == "" || lastName == "" || email == "" || password == "") {
  return res.status(401).json({ error: 'Données manquantes !' });
}

if (!regexMail.test(email)) {
  return res.status(400).json({ 'error': 'email is not valid' });
}

*/