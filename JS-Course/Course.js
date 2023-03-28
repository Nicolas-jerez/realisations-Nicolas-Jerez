let classement;
let newUser;
let posNewUser;

function insertAfter(existingNode, first) {
    let tbody = document.querySelector('tbody');
    let tr = document.createElement("tr");
    let tdIndice = document.createElement("td");
    let tdPerf = document.createElement("td");
    let tdNom = document.createElement("td");
    tdIndice.textContent = classement.indice(newUser.nom)+1
    tdPerf.textContent = newUser.perf
    tdNom.textContent = newUser.nom
    tr.appendChild(tdIndice)
    tr.appendChild(tdPerf)
    tr.appendChild(tdNom)
    

    if(first){
        //way to add in fist place
        tbody.prepend(tr);
    }
    else{
        existingNode.parentNode.insertBefore(tr, existingNode.nextSibling);
    }
}

function classer (){
    let inserted = false;
    let nom = document.getElementById('nomClasser').value;
    let perf = document.getElementById('temps').value;
    let time = perf.split(':');
    newUser = new Participant(nom, new Temps(parseInt(time[0]), time[1], time[2]))
    classement.inserer(newUser)
    
    var tds = document.querySelectorAll('tbody tr'), i;

    for(i = 0; i < tds.length; ++i){
        if ((tds[i].children[1].textContent > newUser.perf.toString())){
            //verif if the element is in first position
            if (i == 0){
                insertAfter(tds[i], true)    
            }
            else{
                insertAfter(tds[i-1], false)
            }
            //verif if the element in last position
            inserted = true;
            //updating the classment position of every runners after the new time
            for (k = i; k < tds.length; k++){
                tds[k].children[0].textContent = parseInt(tds[k].children[0].textContent) + 1 
            }
            break;
        }
    }
    if (!inserted){
        insertAfter(tds[tds.length-1], false)
    }

}

function declasser(){
    var nom = document.getElementById("nomDeclasser").value;
    var tds = document.querySelectorAll('tbody tr')
    for(i = 0; i < tds.length; ++i){
        if ((tds[i].children[2].textContent == nom)){
            tds[i].remove();
            for (k = i; k < tds.length; k++){
                tds[k].children[0].textContent = parseInt(tds[k].children[0].textContent) - 1 
            }
        }
    }
}


//unused unless in the init function 
function afficher(){
    let tbody = document.querySelector("tbody");
    let table = document.querySelector("table")
    if (tbody != null) {
        tbody.remove();
    }
    tbody = document.createElement("tbody")
    table.appendChild(tbody)
    classement.clt.forEach(element => {
        let tr = document.createElement("tr");
        let tdIndice = document.createElement("td");
        let tdPerf = document.createElement("td");
        let tdNom = document.createElement("td");

        tdIndice.textContent = classement.indice(element.nom)+1
        tdPerf.textContent = element.perf
        tdNom.textContent = element.nom

        tr.appendChild(tdIndice)
        tr.appendChild(tdPerf)
        tr.appendChild(tdNom)

        tbody.appendChild(tr)
    })
}

function init(){
    //pre-add some runners with the old method 
    classement = new Classement();
    classement.inserer(new Participant("Pierre", new Temps(1, 2, 3)));
    classement.inserer(new Participant("Jean", new Temps(3, 4, 3)));
    classement.inserer(new Participant("Paul", new Temps(4, 3, 4)));

    afficher();
}








