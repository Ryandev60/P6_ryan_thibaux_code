                    /* IMPORTATION */

// Importation d'express qui est un framework pour construire des applications web basées sur nodeJS
const express = require("express");

// Création de la méthode express.Router pour les routes
const router = express.Router();

// Importation du controllers sauce
const sauceCtrl = require("../controllers/sauce");

// Importation de auth pour la sécurisation par jsonwebtoken
const auth = require('../middleware/auth');

// Importation multer pour les images
const multer = require('../middleware/multer-config');

                    /* ROUTES */

// Route pour récupérer toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauce);

// Route pour créer une sauce
router.post('/', auth, multer,sauceCtrl.createSauce);

// Route pour récupérer une sauce
router.get('/:id', auth,sauceCtrl.getOneSauce);

// Route pour Route pour modifier une sauce
router.put('/:id', auth, multer,sauceCtrl.modifySauce);

// Route pour supprimer une sauce
router.delete('/:id', auth,sauceCtrl.deleteSauce);

// Route pour liker ou disliker une sauce
router.post('/:id/like', auth,sauceCtrl.evaluateSauce);

                    /* EXPORTATION */

// Exportation des routes
module.exports = router;

/* Dans ce fichier nous avons avons toutes les routes dont nous avons besoin,
pour chaque route un controllers y est attribué */