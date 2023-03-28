// Exécute la partie serveur d'un bureau pour un électeur dont le nom et le mot de passe sont donnés
// sur la ligne de commande
// Reçoit les votes de tous les bureaux mais ne renvoie les résultats finaux qu'au bureau local

const process = require('process'); // pour argv et exit
const WebSocket = require('ws');    // WebSocket
const crypto = require('crypto');   // cryptage des mots de passe

// ------- Initialisation de la question et de la liste électorale
const config = require('./Config.js');
var laListe = config.listeElectorale();
var laQuestion = config.question();

// ------- Tableau des résultats, un par réponse, tous initialisés à 0
var nbVotants = 0;
var resultats = [];
// TODO : initialiser le tableau (utiliser Array.push)
for (var i=0; i < laQuestion.nbChoix; i++) {
    console.log(i)
    resultats.push(0);
}
// -------- Analyse des arguments (nom, mdp, portHTTP), vérification de l'authentification et
//          création du bureau
if (process.argv.length !== 5) {
    console.error("Usage : node Bureau.js Nom Mdp portHTTP");
    process.exit(1);
}
var nom = process.argv[2];
var mdp = crypto.createHash('md5').update(process.argv[3]).digest("hex").toUpperCase();
// TODO : trouver l'indice de l'utilisateur (nom, mdp) dans la liste électorale :
// utilisez Array.findIndex
var monBureau = laListe.findIndex(votant => nom === votant.nom && mdp === votant.mdp);

if (monBureau === -1) {
    console.error("Authentification incorrecte : " + nom);
    process.exit(1);
}
var portLocal = laListe[monBureau].local;
var portRemote = laListe[monBureau].remote;
console.log("Bureau ouvert pour", nom);

// ------- Configuration du serveur Web pour l'interface utilisateur dans le navigateur
var portHTTP = parseInt(process.argv[4]);
const Express = require('express');
const app = new Express();
// Pour servir les fichiers statiques (HTML, CSS, JavaScript, images,..) du répertoire courant
app.use('/assets', Express.static('public'));

// Configuration du langage de template (Twig)
const Twig = require("twig");
const {json} = require("express");
app.set('view engine', 'twig');
app.set('views', 'templates');        // Où sont rangés les templates

// Lancement de l'écoute sur le port portHTTP mais uniquement pour des connexions locales
app.listen(portHTTP, 'localhost',
    () => console.log(`Le serveur écoute sur le port ${portHTTP} de localhost.`))

// Une seule page : Bureau.html, chargée par http://localhost:portHTTP
app.get('/', function service(req, res) {
    // TODO: compléter puis décommenter la ligne suivante
    res.render("Bureau.html.twig", { 'titre': "Vote", 'nom': nom, 'port': portLocal });
});

// ------- TODO : Gestion des communications :
const msgSock = new WebSocket.Server({'port': portLocal});
//msgSock.on('connection', handleNewConnection);



msgSock.on('connection', function(client) {

    client.send(JSON.stringify({"type" : "QUESTION", "valeur" : laQuestion}));

    client.on('message',function (evt) {
        resultats[evt] += 1;
        client.send(JSON.stringify({"type" : "RESULT", "valeur" : resultats}));
    });
});

//     client.send(JSON.stringify({"type" : "TABLEAU", "valeur" : resultats}));
//msgSock.on('message', handleNewMessage);


//  Ouvrir un socket pour communiquer avec le navigateur :
//      - à la connexion : envoi de la question
//      - sur réception du vote local : envoi à tous les bureaux (y compris moi-même)
//
//  Ouvrir un socket pour recevoir les votes des autres bureau (et de moi-même)
//      - sur réception d'un vote :
//          - l'enregistrer
//          - envoyer les résultats au navigateur
//          - si tout le monde a voté :
//              - envoyer le message de fin au navigateur
//              - fermer la connexion
//
