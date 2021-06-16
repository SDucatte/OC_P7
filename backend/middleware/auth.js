const jwt = require('jsonwebtoken');

// Middleware qui renvoi un token d'authentification pour sécuriser les connexions
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.token = jwt.verify(token, '3d2a5a16c34e1c1329b27c9512cd8f54');

    next();
   
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};