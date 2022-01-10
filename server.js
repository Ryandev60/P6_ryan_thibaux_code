// Pour lancer le serveur il faudra aller dans le dossier backend puis faire la commande npm run watch

// Importation du package HTTP 
const http = require('http');

// Importation de notre fichier app.js
const app = require('./app');

// La fonction normalizePort renvoie un port valide,
//qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;

const normalizePort = val => {
 const port = parseInt(val, 10);

 if (isNaN(port)) {
   return val;
 }
 if (port >= 0) {
   return port;
 }
 return false;
};
const port = normalizePort(process.env.PORT || '3000');

app.set('port', process.env.PORT || 3000); // L'application express va tourner sur le port 3000

// La fonction errorHandler  recherche les différentes erreurs et 
//les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
 if (error.syscall !== 'listen') {
   throw error;
 }
 const address = server.address();
 const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
 switch (error.code) {
   case 'EACCES':
     console.error(bind + ' requires elevated privileges.');
     process.exit(1);
     break;
   case 'EADDRINUSE':
     console.error(bind + ' is already in use.');
     process.exit(1);
     break;
   default:
     throw error;
 }
};

// Création du serveur 
const server = http.createServer(app);

//Un écouteur d'évènements est enregistré, 
//consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// On dit au serveur sur quelle adresse écouter,si la plateforme de déploiement propose un port
// par défaut ce sera lui sinon se sera le port 3000
server.listen(port);