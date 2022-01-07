


window.onload = init; 

function init(){
let testForum = !!document.querySelector("#section4-flexbody");

if(testForum){
// ---  --- INITIALISATION DES VARIABLES --- --- 
//Array contenant les élements à vérifier dans le forumulaire.
let verifElement_arr = [];

// Variables des élements dont la 'Value' est à vérifier  | Structure 1 /2 /3 /4 | POSSIBILITE D'EN AJOUTER ICI.
let verifPseudo_html, verifFirstPassword_html, verifSecondPassword_html, verifMail_html;


// Array contenant les résultats des tests 
let verificationInscription_arr;

// Variables des résultats des tests | Structure 1 /2 /3 /4 | POSSIBILITE D'EN AJOUTER ICI.
let verifLengthPseudo_bool, verifIdentiquePassword_bool, verifLengthPassword_bool , verifLengthEmail_bool ;

// Variable ciblant la zone où sera inscrit le message suite à l'envoi du formulaire.
let zoneMessageInscription_html;

// Array contenant les messages d'erreur en cas d'échec aux tests. 
let messageErreur_arr = [];

// Variables des différents messages d'erreur en cas d'échec aux tests | Structure 1 /2 /3 /4 | | POSSIBILITE D'EN AJOUTER ICI.
let messageErreurLengthPseudo_str, messageErreurIdentiquePassword_str, messageErreurLengthPassword_str, messageErreurLengthEmail_str;


// Array contenant les min et max des longeurs des 'value' testées.
let minMax_arr = []; 

// Variables contenant les min et max des longeurs des 'value' testées.
let minPseudo, maxPseudo, minPassword, maxPassword, minMail, maxMail;

// Variable contenant le message en cas de réussite à l'ensemble des tests. 
let messageReussiteInscription_str;

// Variable contenant le message en cas d'échec au test REGEX du password. 
let messageErreurRegexPassword_str;

// Variable contenant le message en cas d'échec au test REGEX de l'Email. 
let messageErreurRegexEmail_str;

// Variable ciblant le bouton de soumission du formulaire d'inscription.
let buttonInscription_html;


// --- --- ATTRIBUTION DE VALEURS AUX VARIABLES --- --- 

// Ciblage des élements HTML à tester | Structure 1 /2 /3 /4 | | POSSIBILITE D'EN AJOUTER ICI.
verifPseudo_html = document.querySelector("#inscription_identifiant");
verifFirstPassword_html = document.querySelector("#inscription_motdepasse");
verifSecondPassword_html = document.querySelector("#inscription_motdepasse_verif");
verifMail_html = document.querySelector("#inscription_email");

// Mise en array de ces élements | Structure 1 /2 /3 /4 | | POSSIBILITE D'EN AJOUTER ICI.
verifElement_arr[0] = verifPseudo_html;
verifElement_arr[1] = verifFirstPassword_html;
verifElement_arr[2] = verifSecondPassword_html;
verifElement_arr[3] = verifMail_html;


// Mise à False en défaut des résultats des tests //
verificationInscription_arr = [false,false,false,false];

// Association des résultats des tests à des cases d'array | Structure 1 /2 /3 /4 | | POSSIBILITE D'EN AJOUTER ICI.
verifLengthPseudo_bool          = verificationInscription_arr[0];
verifIdentiquePassword_bool     = verificationInscription_arr[1];
verifLengthPassword_bool        = verificationInscription_arr[2];
verifLengthEmail_bool           = verificationInscription_arr[3];

// Résultats attendus aux tests
minPseudo = 5;
maxPseudo = 40;
minPassword = 8;
maxPassword = 30;
minMail = 10;
maxMail = 150;

// Mise en array de ces élements | Structure 1 /2 /3 /4 | | POSSIBILITE D'EN AJOUTER ICI.
minMax_arr[0] = []; minMax_arr[1] = []; minMax_arr[2] = []; minMax_arr[3] = [];
minMax_arr[0][0] = minPseudo;
minMax_arr[0][1] = maxPseudo;
minMax_arr[1][0] = "pas de données"; // Le deuxième test n'est pas un test de longueur mais un test de comparaison donc pas de valeur dans l'array.
minMax_arr[1][1] = "pas de données"; // IDEM
minMax_arr[2][0] = minPassword;
minMax_arr[2][1] = maxPassword;
minMax_arr[3][0] = minMail;
minMax_arr[3][1] = maxMail;


// Ciblage de la zone HTML du message suite au test
zoneMessageInscription_html = document.querySelector("#message_verification_inscription");

// Définition du message de réussite 
messageReussiteInscription_str = "Votre inscription a bien été prise en compte";

// Définition des messages d'échec aux tests de l'array verificationInscription_arr
messageErreurLengthPseudo_str = "Votre pseudonyme doit faire entre " + minMax_arr[0][0] + " et " + minMax_arr[0][1] +" caractères.";
messageErreurIdentiquePassword_str = "Les deux champs concernant le mot de passe doivent être identique.";
messageErreurLengthPassword_str = "Votre mot de passe doit faire entre " + minMax_arr[2][0] + " et " + minMax_arr[2][1] +" caractères.";
messageErreurLengthEmail_str = "Votre mail doit faire entre " + minMax_arr[3][0] + " et " + minMax_arr[3][1] +" caractères.";

// Mise en array des messages d'erreur
messageErreur_arr[0] = messageErreurLengthPseudo_str;
messageErreur_arr[1] = messageErreurIdentiquePassword_str;
messageErreur_arr[2] = messageErreurLengthPassword_str;
messageErreur_arr[3] = messageErreurLengthEmail_str;

// Définition du message d'erreur
messageErreurRegexPassword_str = "Votre mot de passe doit contenir à minima une lettre minuscule, une majuscule, un chiffre et un caractère spécial."
messageErreurRegexEmail_str = "Votre adresse Email n'a pas le bon format."


// Ciblage du bouton d'envoi du formulaire d'inscription.
buttonInscription_html = document.querySelector("#inscription_button");

// Création de l'évènement click et lancement de la fonction. 
buttonInscription_html.addEventListener("click", verificationFormulaire);



// --- --- Fonction de vérification d'un formulaire --- --- 
function verificationFormulaire() {
let compteur = 0; // Compteur qui permet de savoir combien de test ont été réussi avec succès. 
// zoneMessageInscription_html.innerHTML;
for (let i = 0; i < verifElement_arr.length; i++) {
    if(i==1) { // Test d'égalité du Password / Password répétition
        if(verifElement_arr[i].value == verifElement_arr[i+1].value) {
            verificationInscription_arr[i] = true;
            compteur++;
        } else {
            verificationInscription_arr[i] = false;
            zoneMessageInscription_html.innerHTML = messageErreur_arr[i];
            break;
        }
    }    
else {
    if(verifElement_arr[i].value.length >= minMax_arr[i][0] && verifElement_arr[i].value.length <= minMax_arr[i][1]) {
        if(i==2) { // Test REGEX du password
            let myRegexConditionPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])/; // Formule pour : au moins 1 chiffre + au moins 1 minuscule + au moins 1 caractère spécial
            let myRegexStringPassword = verifElement_arr[i].value; // On récupère la string-valeur de l'input password
            let myRegexTestPassword = myRegexConditionPassword.test(myRegexStringPassword); // On passe le texte REGEX a cette string
            if(!myRegexTestPassword){
                zoneMessageInscription_html.innerHTML=messageErreurRegexPassword_str;
                break;
            }
        }
        if(i==3) { // Test REGEX du mail
            let myRegexConditionEmail1 = /^[\w]+[\w\d-_.]*[\w\d]+[@]{1}[\w\d-_.]{2,}[.]{1}[\w]{2,}$/i;
            let myRegexConditionEmail2 = /\.(?=\.)/;
            let myRegexConditionEmail3 = /_(?=_)/;
            let myRegexConditionEmail4 = /-(?=-)/;

            let myRegexStringEmail = verifElement_arr[i].value;
            let myRegexTestEmail1 = (myRegexConditionEmail1).test(myRegexStringEmail);
            let myRegexTestEmail2 = (myRegexConditionEmail2).test(myRegexStringEmail);
            let myRegexTestEmail3 = (myRegexConditionEmail3).test(myRegexStringEmail);
            let myRegexTestEmail4 = (myRegexConditionEmail4).test(myRegexStringEmail);


            if(!myRegexTestEmail1 || myRegexTestEmail2 || myRegexTestEmail3 || myRegexTestEmail4){
                zoneMessageInscription_html.innerHTML=messageErreurRegexEmail_str;
                break;
            }
        }
        verificationInscription_arr[i] = true
        compteur++;
    } else {
        verificationInscription_arr[i] = false;
        zoneMessageInscription_html.innerHTML = messageErreur_arr[i];
        break;
    }
    }
}
if(compteur >= verifElement_arr.length){
    zoneMessageInscription_html.innerHTML = messageReussiteInscription_str;}
}}



let card_arr = document.querySelectorAll("#section2 .card-event-element");

    card_arr.forEach(element => {
      element.addEventListener('mouseenter', function() {
        let children = element.childNodes;
        let children_arr = Array.from(children);
        let linkCard_html = children_arr[3];
        linkCard_html.classList.remove("hidden");
      })

      element.addEventListener('mouseleave', function() {
        let children = element.childNodes;
        let children_arr = Array.from(children);
        let linkCard_html = children_arr[3];
        linkCard_html.classList.add("hidden");
        
      })
    })



/*EFFET CARD */

let couleurUne = 60;
            let couleurDeux = 30;
            let couleurUne_bool = false;
            let couleurDeux_bool = true;

            let trouverCouleur = function(couleur,couleur_bool
            ) {
              let teinteMax =   60;

              return "hsl(" + couleur + ", 100%, 45%)"
            }
            
            let incrementCouleur_fct = function(couleur, couleur_bool) {
              if(couleur_bool){couleur++} else {couleur--}
              return couleur;
            }

            let testCouleurBool_fct = function(couleur, couleur_bool) {
              if (couleur === 60){couleur_bool = false} else if (couleur === 0){couleur_bool = true}
              return couleur_bool;
            }
                      
            let changeLinear = function() {
              let styleCardAfter = document.createElement('style');

              couleurUne = incrementCouleur_fct(couleurUne,couleurUne_bool);
              couleurDeux = incrementCouleur_fct(couleurDeux,couleurDeux_bool);
              couleurUne_bool = testCouleurBool_fct(couleurUne,couleurUne_bool);
              couleurDeux_bool = testCouleurBool_fct(couleurDeux,couleurDeux_bool);
              if(document.getElementsByTagName('style').length == 0) {
                let styleCardAfter = document.createElement('style');

                styleCardAfter.innerHTML = '.card-event::after{background:linear-gradient(0deg,' + trouverCouleur(couleurUne, couleurUne_bool) + ',' + trouverCouleur(couleurDeux, couleurDeux_bool) + ')}.card-event::before{background:linear-gradient(0deg,' + trouverCouleur(couleurUne, couleurUne_bool) + ',#0e1538,' + trouverCouleur(couleurDeux, couleurDeux_bool) + ')}';
                document.head.appendChild(styleCardAfter)}
              else {
                let styleCardAfter = document.head.lastChild;
                styleCardAfter.innerHTML = '.card-event::after{background:linear-gradient(0deg,' + trouverCouleur(couleurUne, couleurUne_bool) + ',' + trouverCouleur(couleurDeux, couleurDeux_bool) + ')}.card-event::before{background:linear-gradient(0deg,' + trouverCouleur(couleurUne, couleurUne_bool) + ',#0e1538,' + trouverCouleur(couleurDeux, couleurDeux_bool) + ')}';
              }
            }

setInterval(changeLinear,15);





}