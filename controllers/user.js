// Importation de bcrypt pour sécuriser (hasher) les mots de passe dans la base de donnée
const bcrypt = require("bcrypt");

// Importation jsonwebtoken pour l'authentifaction par token pour la sécurité afin de lié un utilisateur à chaque requête
const jwt = require("jsonwebtoken");

// Importation du model user
const userModels = require("../models/user");

// Inscription utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new userModels({
        email: req.body.email,
        password: hash,
      });
      user
        .save() // La méthode save enregistre l'objet dans la base de donné
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connexion utilisateur
exports.login = (req, res, next) => {
  userModels.findOne({email: req.body.email }) // On cherche si l'email rentré par l'utilisateur correspond à un email dans la DB
 .then(user => {
  if (!user) { // Si on ne trouve pas d'utilisateur on renvoi une erreur
   return res.status(401).json({error: 'Utilisateur non trouvé !' });
  }
  bcrypt.compare(req.body.password, user.password) // On comparer le mot de passe rentré par l'utilisateur avec le mot de passe correspondant hasher du dans la DB
  .then(valid => {
   if (!valid) { // Si ce n'est pas valable 
    return res.status(401).json({error: 'Mot de passe incorrect !' });
   } // Si c'est valable
   res.status(200).json({ // On renvoi un code 200 pour dire que tout s'est bien passé avec un objet json qui contient :
    userId: user._id, // userId sera égal a l'identifiant de l'utilisateur dans la DB
    token: jwt.sign( //
     { userId: user._id }, // Les données que l'on va encoder
     process.env.JWT_SECRET, // Clé secréte pour l'encodage
     {expiresIn: "24h" } // Durée de validité du token
    )
   });
  })
  .catch(error => res.status(500).json({ error })); // Erreur serveur
 })
 .catch(error => res.status(500).json({ error })); // Erreur serveur
};
