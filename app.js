// Importation d'express qui est un framework pour construire des applications web basées sur nodeJS
const express = require("express");

// Importation du package mongoose
const mongoose = require("mongoose");

// Nous donne accés au chemin de notre système de fichier (images dans ce cas)
const path = require("path");

// Importations des routes user
const userRoutes = require("./routes/user");

// Importations des routes sauces
const sauceRoutes = require("./routes/sauce");

// Création de l'application express
const app = express();

// Cacher les données sensible

const dotenv = require('dotenv').config();

// Connexion à la base de données mongoDB

mongoose
  .connect(
    `mongodb+srv://${process.env.APP_USERNAME}:${process.env.APP_PASSWORD}@cluster0.o8wxd.mongodb.net/${process.env.APP_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type 
// application/json  et met à disposition leur  body  directement sur l'objet req
app.use(express.json());

// Ajout de headers à l'objet res pour permettre à l'application d'accéder à l'API
app.use((req, res, next) => { // On l'applique sur toutes les routes
  res.setHeader("Access-Control-Allow-Origin", "*"); // On Autorise tout le monde à acceder à notre API
  res.setHeader( // On donne l'autorisation de pouvoir utiliser certains headers sur response
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader( //  On donne l'autorisation de pouvoir utiliser certaines méthodes
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next(); // On passe l'éxécution au middleware suivant
});

//On dit à l'application express de servir le dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

// Ici on va filtrer les requêtes vers nos différentes routes
app.use("/api/auth", userRoutes);

app.use("/api/sauces", sauceRoutes);

// Exportation de notre application pour y avoir accés depuis notre serveur node
module.exports = app;
