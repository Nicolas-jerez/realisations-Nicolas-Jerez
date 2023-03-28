/* Programme de test de la classe Temps en mode ligne de commande.
 * Il faut :
 *    console.log() : pour afficher
 *    require()  : pour charger un code JS
 *    process.exit(N) : pour quitter
 *    arguments[] : tableau des arguments
 */

const LesClasses = module.require('./Classes.js');
const Temps = LesClasses.Temps;

var t1 = new Temps(2, 3, 3); console.log("t1 = " + t1);
var t2 = new Temps(2, 30, 59); console.log("t2 = " + t2);
var t3 = new Temps(2, 2, 59); console.log("t3 = " + t3);
var t4 = new Temps(1, 20, 59); console.log("t4 = " + t4);

switch (t1.compare(t2)) {
   case -1: console.log("t1 < t2"); break;
   case 0: console.log("t1 == t2"); break;
   case 1: console.log("t1 > t2"); break;
}

switch (t2.compare(t2)) {
   case -1: console.log("t2 < t2"); break;
   case 0: console.log("t2 == t2"); break;
   case 1: console.log("t2 > t2"); break;
}

switch (t1.compare(t3)) {
   case -1: console.log("t1 < t3"); break;
   case 0: console.log("t1 == t3"); break;
   case 1: console.log("t1 > t3"); break;
}

switch (t4.compare(t3)) {
   case -1: console.log("t4 < t3"); break;
   case 0: console.log("t4 == t3"); break;
   case 1: console.log("t4 > t3"); break;
}

// process.exit(0);
