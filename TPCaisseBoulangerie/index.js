// Application Express + Twig
const Twig = require("twig"),
    express = require('express'),
    app = express();
 
// Port de service
const PORT = 8000;

// This section is optional and used to configure twig.
app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});
 
// Configuration de Express
app.set('view engine', 'twig');
app.set('views', 'templates'); // répertoire pour les vues Twig
app.use('/assets', express.static('.'));  // répertoire pour les fichiers "statiques" css, js, img, ...

// Pour /bonjour ou /bonjour/Albert
app.get('/bonjour/:name?', function(req, res){
    let nom = req.params.name;
    if (nom === undefined) {
        nom = "joyeux contribuable";
    }
    res.render('bonjour.html.twig', {
        'nom' : nom
    });
});
app.get('/', function(req, res){
    res.render('caisse.html.twig');
});


// Les raccourcis
let raccourcis = [
    {'libelle': "3 + 1 Pains choc.", 'prix': 0.75, 'qte': 4},
    {'libelle': "2 Grangeoises", 'prix': 1, 'qte': 2},
    {'libelle': "Baguette céréales", 'prix': 1.10, 'qte': 1},
    {'libelle': "Crussol", 'prix': 13, 'qte': 1},
    {'libelle': "Formule sandwich", 'prix': 6.30, 'qte': 1},
];


app.get('/api/raccourcis/:N?', function (req, res){
    let n = req.params.N;
    res.json(raccourcis[n])
})
// TODO : ajouter un accès /api/raccourcis/N pour la caisse enregistreuse
 
// Lancement de l'écoute sur le port portHTTP mais uniquement pour des connexions locales
app.listen(PORT, 'localhost', () => console.log(`Le serveur écoute sur http://localhost:${PORT}`))

