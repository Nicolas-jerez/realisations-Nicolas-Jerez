/* Récupération de la liste électorale et de la fonction, en dur pour l'instant */

function getListeElectorale () {
    return [ {"nom":"Tintin","mdp":"AC092FD6138D00AA1C56DBBE9A0AE256",
              "host":"localhost", "local":7775, "remote":7771} ];
}

function getQuestion() {
    return {"libellé":"Quel est l'intrus parmi ces 4 personnes ?",
            "reponses":["Cyril Hanouna","Donald Trump","Li Lu Feng","Nabila Benatia"],
            "nbChoix":4 };
}

if (typeof module != typeof undefined) {
    module.exports = {
        'listeElectorale': getListeElectorale,
        'question': getQuestion
    };
}
