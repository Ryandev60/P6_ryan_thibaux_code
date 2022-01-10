// Importation du package mongoose
const mongoose = require('mongoose');

// Création du schéma (model) de la sauce qui sera rajouter
const sauceSchema = mongoose.Schema({
 userId: { type: String, required: true },
 name: { type: String, required: true },
 manufacturer: { type: String, required: true },
 description: { type: String, required: true },
 mainPepper: { type: String, required: true },
 imageUrl: { type: String, required: true },
 heat: { type: Number, required: true },
 likes: { type: Number, default: 0},
 dislikes: { type: Number, default: 0},
 usersLiked: { type: [String], default: [] },
 usersDisliked: { type: [String], default: []}
});

// Exportation du model sauceSchema (Premier argument = nom du model), deuxième = model
module.exports = mongoose.model('sauce', sauceSchema)

/* Ici on importe le package mongoose pour que l'on puisse se servir de ses méthodes,
puis nous créons notre model d'objet*/