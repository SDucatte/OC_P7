// Imports
const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/commentCtrl');
const auth = require('../middleware/auth');

// ajout des actions réalisées par l'Api dans notre router
router.get("/", commentCtrl.getAllComment);
router.get("/:id", commentCtrl.getOneComment);
router.post("/", auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.modifyComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;

