/* Variables globales car utilisées par plusieurs fonctions */
var laQuestion; // Téléchargée depuis le bureau
var msgSock = new WebSocket("ws://localhost:" + PORTLOCAL);

function pose(question) {
    var fieldset = $('fieldset');
    fieldset.children().eq(0).text(question.libellé);
    question.reponses.forEach(function (r, indice) {
        let div = $('<div class="form-check">');
        let input = $('<input class="form-check-input" type="radio" name="reponse">')
            .attr('value', indice)
            .attr('id', "i"+indice);
        let label = $('<label class="form-check-label">').attr('for', "i"+indice).append(r);
        div.append(input).append(label);
        fieldset.append(div);
    });
}

function afficheResultats(res) {
    console.log(res)
    var aCloner = $('#resultats > thead > tr:last-child');
    var tbody = $('#resultats > tbody');
    tbody.empty(); // pas forcément obligatoire si on n'affiche les résultats qu'une fois à la fin
    res.forEach(function (valeur, indice) {
        var tr = aCloner.clone(true).removeAttr('style');
        tr.children().eq(0).text(laQuestion.reponses[indice]);
        tr.children().eq(1).text(valeur);
        tbody.append(tr);
    });
}

function voter () {
    // on vérifie qu'une case est cochée
    var radios = $('input[name=reponse]');
    var numReponse = -1;
    radios.each(function (indice, current) {
        if (current.checked) {
            numReponse = indice;
        }
    });
    if (numReponse === -1) {
        alert("Il faut sélectionner une réponse");
    } else {
        // Transmettre le vote au serveur local
        msgSock.send(numReponse);

        // Masquer le bouton de vote
        $('#valider').hide();
    }
}

function messageDeFin() {
    $('<h1>').text("Vote terminé").appendTo($('body'));
}

$(document).ready(function (){
    // TODO : à compléter :
    //     Ouverture du socket de communication wsLocal avec le bureau sur PORTLOCAL, voir Bureau.html
    //     Sur réception d'un message :
    //          QUESTION : l'afficher
    //          RESULTS : les afficher
    //          FIN : afficher un message de fin

    msgSock.onmessage = function (evt) {
        var mess = JSON.parse(evt.data);
        if (mess.type === "QUESTION"){
            laQuestion = mess.valeur
            pose(JSON.parse(evt.data).valeur);
        }
        else if (mess.type === "RESULT"){
            afficheResultats(JSON.parse(evt.data).valeur);
        }
        else if (mess.type === "FIN"){
            messageDeFin();
        }

    };
    msgSock.onopen = function() {
    };

    $('#valider').click(voter);
});
