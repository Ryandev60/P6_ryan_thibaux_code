// Importation du package mongoose
const mongoose = require('mongoose');

// Importation plugin mongoose uniqueValidator pour avoir un email par compte
const uniqueValidator = require('mongoose-unique-validator');

// Schema de l'utilisateur
const userSchema = mongoose.Schema({
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true}
});

// Application du plugin mongoose uniqueValidator pour avoir un email par compte
userSchema.plugin(uniqueValidator);

// Exportation du model userSchema (Premier argument = nom du model), deuxième = model

module.exports = mongoose.model('user', userSchema);