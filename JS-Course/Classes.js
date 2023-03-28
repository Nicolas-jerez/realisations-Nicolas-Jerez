/* Classes pour la gestion d'un course contre la montre */

/* ------- Gestion des temps ------- */
class Temps {
    constructor(h, m, s) {
        this.heures = h;
        this.minutes = m;
        this.secondes = s;
    }

    avecUnZero(n) {
        if (n < 10 && n.toString().length === 1) return "0" + n;
        return "" + n;
    }

    toString() {
        return this.heures + "h" 
            + this.avecUnZero(this.minutes) + "m" 
            + this.avecUnZero(this.secondes) + "s";
    }

    /* Comparaison de deux temps, retourne :
     *    -1 si this < t
     *    0 si this = t
     *    1 si this > t */
    compare(t) {
        if (this.heures < t.heures) return -1;
        if (this.heures > t.heures) return 1;
        /* ici this.heures = t.heures */
        if (this.minutes < t.minutes) return -1;
        if (this.minutes > t.minutes) return 1;
        /* ici this.heures = t.heures et t1.minutes = t2.minutes */
        if (this.secondes < t.secondes) return -1;
        if (this.secondes > t.secondes) return 1;
        /* this = t */
        return 0;
    }
}

/* ------- Un participant :
 *   - nom : une chaîne 
 *   - perf : un Temps */
class Participant {
    constructor(nom, perf) {
        this.nom = nom;
        this.perf = perf;
    }

    toString() {
        return this.nom + " - " + this.perf;
    }
}

/* ------- Classe pour la liste des participants pour le classement 
 *         et les fonctions de gestion de cette liste ------- */
class Classement {
    constructor() {
        this.clt = new Array();
    }

    /* Insertion d'un participant dans la table clt */
    inserer(p) {
        var i = this.clt.length - 1;
        while ((i >= 0) && (p.perf.compare(this.clt[i].perf) < 0)) {
            this.clt[i+1] = this.clt[i];
            i = i - 1;
        }
        this.clt[i+1] = p;
    }

    /* Suppression de l'élément à l'indice n */
    supprimer(indice) {
        for(var i = indice; i < this.clt.length - 1; i++) {
            this.clt[i] = this.clt[i+1];
        }
        this.clt.pop(); // efface le dernier élément (vide)
    }

    /* Recherche de l'indice d'un élément donné par son nom, retourne -1 s'il n'est pas trouvé */
    indice(nom) {
        for (let indice = 0; indice < this.clt.length; indice++){
            if (this.clt[indice]["nom"] === nom){
                return indice;
            }
        }
        return -1;
    }
}

// Exportation pour NodeJS, le test permet d'éviter un message d'erreur (module is not defined) quand
// on charge le fichier dans un navigateur.
if (typeof module !==  typeof undefined) {
    module.exports = {
        'Temps': Temps,
        'Participant': Participant,
        'Classement': Classement
    }
}
