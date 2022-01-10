// Importation d'express qui est un framework pour construire des applications web basées sur nodeJS
const express = require('express');

const router = express.Router();

// Importation du controllers user
const userCtrl = require('../controllers/user');

// Route pour créer un user
router.post('/signup', userCtrl.signup);

// Route pour connecter un user
router.post('/login', userCtrl.login);

// Exportation des routes
module.exports = router;