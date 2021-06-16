// Imports
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/postCtrl');

// ajout des actions réalisées par l'Api dans notre router
router.get("/", postCtrl.getAllPost);
router.get("/:id", postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);


module.exports = router;