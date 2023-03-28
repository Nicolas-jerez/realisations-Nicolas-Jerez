/* Programme de test de la classe Classement de LesClasses.js */

const LesClasses = require('./Classes.js');
const Temps = LesClasses.Temps;
const Participant = LesClasses.Participant;
const Classement = LesClasses.Classement;

// Création de quelques participants (jeu d'essai)
C = new Classement();
// Quelques éléments pour test
C.inserer(new Participant("Pierre", new Temps(2, 2, 3)));
C.inserer(new Participant("Paul", new Temps(2, 25, 27)));
C.inserer(new Participant("Martin", new Temps(2, 25, 27)));
C.inserer(new Participant("Jacques", new Temps(2, 31, 2)));

console.log("Classement :");
for (i in C.clt) {
   console.log("\t" + C.clt[i]);
}

console.log("\nRecherche de Georges =>" + C.indice("Georges"));
console.log("Recherche de Martin =>" + C.indice("Martin"));
console.log("\nDéclassement de Martin...");
C.supprimer(C.indice("Martin"));

console.log("\nNouveau classement :");
for (i in C.clt) {
   console.log("\t" + C.clt[i]);
}

