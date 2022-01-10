// Importation de multer pour l'introduction d'images
const multer = require("multer");

// Conversion du format d'images
const MIME_TYPES = { 
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Enregistrement dans le dossier images
const storage = multer.diskStorage({
  destination: (req, file, callback) => { // Destination des images
    callback(null, 'images'); 
  },
  filename: (req, file, callback) => { // filename va indiquer à multer quel nom de fichier à utilisé
    const name = file.originalname.split(" ").join("_"); // Création de son nom en remplacant les espaces par des _
    const extension = MIME_TYPES[file.mimetype]; // 
    callback(null, name + Date.now() + "." + extension); // Génération d'un nom de fichier unique pour éviter d'avoir 2 nom identique
  },
});

// Exportation de notre middleware multer 
module.exports = multer({ storage }).single('image');