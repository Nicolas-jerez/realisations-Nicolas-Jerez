/* Fichier JavaScript principal de l'application */
// Action quand la page est bien chargée
let boutons = document.querySelectorAll("#boutons-rayons")

function displayRayon(){
    libelle.value = this.textContent;
}
boutons[0].childNodes.forEach(element => element.addEventListener("click", displayRayon));

function enterPressed(){
    let verif = true;
    if (event.code === 'Enter') {
        if(prix.value === ""){
            prix.focus()
            verif = false;
        }
        else if(qte.value === ""){
            qte.focus();
            verif = false;
        }
        if (verif === true) {
            let clone = aCloner.cloneNode(true);
            clone.childNodes[1].textContent = libelle.value;
            clone.childNodes[2].textContent = prix.value;
            clone.childNodes[3].textContent = qte.value;
            clone.childNodes[4].textContent = prix.value*qte.value;
            let tot = (parseInt(totalRecap.textContent) >= 0  ? (parseInt(totalRecap.textContent)) : 0)  + parseInt(clone.childNodes[4].textContent);
            clone.style.visibility = 'visible';
            recapitulatif.appendChild(clone);
            totalRecap.textContent = tot
        }
    }
}

let prix = document.getElementById("prix");
prix.addEventListener("keyup", enterPressed);
let qte = document.getElementById("qte");
qte.addEventListener("keyup", enterPressed);
let i = 0;
let boutonRaccourcis = document.querySelectorAll(".boutonsRaccourcis");
console.log(boutonRaccourcis)
boutonRaccourcis.forEach(function add(element){
    fetch("/api/raccourcis/" + i)
    .then(response => response.json())
    .then(response => element.textContent = (response.libelle))
    .catch(error => alert("Erreur : " + error))
    i++});
//)
