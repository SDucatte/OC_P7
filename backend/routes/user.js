// Imports
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/userCtrl');

// ajout des routes crées dans controllers/user à notre router 
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/account', auth, userCtrl.account);
router.delete('/account', auth, userCtrl.dropAccount);

module.exports = router;