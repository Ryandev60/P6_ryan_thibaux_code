// Importation jsonwebtoken pour l'authentifaction par token pour la sécurité afin de lié un utilisateur à chaque requête
const jwt = require('jsonwebtoken');

// Paramétrage du token
module.exports = (req, res, next) => {
 try {
  const token = req.headers.authorization.split(' ')[1]; // Récupération du token dans le header authorization sans "Bearer"
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // On décode le token grâce à la clé secréte
  const userId = decodedToken.userId; // On récupére le userId qui est dans le token
  req.auth = { userId: userId }; // 
  if ( req.body.userId && req.body.userId !== userId) { // Si on a un userId dans le corps de la requête et que celui ci est différent du userId
   throw 'User ID non valable !'; // On indique que l'userId est non  valable
  } else {
   next(); // On passe la requête au prochain middleware
  }
 } catch (error) {
  res.status(401).json({error: error | 'Requête non authentifiée !' });
 }
};