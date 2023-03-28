/* Programme de test de la classe Participant en mode ligne de commande. */ 
const LesClasses = require('./Classes.js');
const Temps = LesClasses.Temps;
const Participant = LesClasses.Participant;

var pierre = new Participant("Pierre", new Temps(2, 2, 3));
var paul = new Participant("Paul", new Temps(2, 25, 27));
console.log("pierre = " + pierre);
console.log("paul = " + paul);
