// Importation du model sauce
const Sauce = require("../models/Sauce");
const fs = require("fs");

// Création de l'objet sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); // Analyse de sauce pour obtenir un objet utilisable
  const sauce = new Sauce({
    // Création de l'objet
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${ // Indiqué l'URL de l'images
      req.file.filename}`,
  });
  sauce
    .save() // La méthode save enregistre l'objet dans la base de donné
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Supression de l'objet sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      if (!sauce) {
        res.status(404).json({
          error: new Error('Objet non trouvé !')
        });
      }
      if (sauce.userId !== req.auth.userId) {
        res.status(400).json({
          error: new Error('Requête non authorisé !')
        });
      }
      Sauce.deleteOne({ _id: req.params.id }).then(
        () => {
          res.status(200).json({
            message: 'Objet supprimé !'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }
  )
};

// Modification de l'objet sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file // Si req.file existe
    ? {
        ...JSON.parse(req.body.sauce), // Récupération des informations de l'objet
        imageUrl: `${req.protocol}://${req.get("host")}/images/${ // On modifie l'URL de l'image
          req.file.filename
        }`,
      } : { ...req.body }; // Sinon copie req.body
  Sauce.updateOne( // Modification dans la DB
    { _id: req.params.id }, 
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch(() => res.status(403).json({ message: "Unauthorized request" }));
};

// Récupération  de l'objet sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Récupération de tout les objets sauce
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

// Evaluation de l'objet sauce
exports.evaluateSauce = (req, res, next) => {
  // Si l'utilisateur n'a pas liker la sauce
  if (req.body.like === 0) {
    Sauce.findOne({ _id: req.params.id }) // On va l'id de la sauce grâce à l'URL
      .then((sauce) => {
        //Si l'utilisateur a déjà liker la sauce, on enlève le like et on l'enlève des usersLiked
        if (sauce.usersLiked.find((user) => user === req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 }, // On décrémente de 1 les likes
              $pull: { usersLiked: req.body.userId }, // On retire le userId de userLiked
            }
          )
            .then(() => {
              res.status(201).json({ message: "Évaluation prise en compte!" });
            })
            .catch((error) => {
              res.status(400).json({ error });
            });
        }
        //Si l'utilisateur a déjà disliker la sauce, on enlève le dislike et on l'enlève des usersDisLiked
        if (sauce.usersDisliked.find((user) => user === req.body.userId)) {
          Sauce.updateOne( // On va l'id de la sauce dans l'URL
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
            }
          )
            .then(() => {
              res.status(201).json({ message: "Évaluation prise en compte!" });
            })
            .catch((error) => {
              res.status(400).json({ error });
            });
        }
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
  //Si l'utilisateur n'a pas déjà liker la sauce, on rajoute le like et on l'ajoute aux usersLiked
  if (req.body.like === 1) {
    Sauce.updateOne(
      { _id: req.params.id }, // On va l'id de la sauce dans l'URL
      {
        $inc: { likes: 1 }, // On incrémente de 1 les likes
        $push: { usersLiked: req.body.userId }, // On met le userId dans userLiked
      }
    )
      .then(() => {
        res.status(201).json({ message: "Évaluation prise en compte!" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
  //Si l'utilisateur n'a pas déjà disliker la sauce, on rajoute le like et on l'ajoute aux usersdisLiked
  if (req.body.like === -1) {
    console.log(req.body.like);
    Sauce.updateOne(
      { _id: req.params.id }, // On va l'id de la sauce dans l'URL
      {
        $inc: { dislikes: 1 }, // On incrémente le dislike de 1
        $push: { usersDisliked: req.body.userId }, // On met le userId dans userDisliked
      }
    )
      .then(() => {
        res.status(201).json({ message: "Évaluation prise en compte!" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};

/* Dans ce fichier nous avons nos controllers qui vont effectuer une action pour chaque route */
