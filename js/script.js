// ! ==================================================Variable==================================================
// // Liste des mots a trouvé
const mot = ["chausette", "velo", "internet", "ordinateur", "telephone", "trousse", "cable"]

// Ajout des buttons
const key = document.querySelectorAll(".key");

// Ajout de la P ou sera afficher le mot aléatoire
const host_mot = document.querySelector("#host_mot")

// Prend un mot aléatiore dans la liste 
const mot_aleator = mot[Math.floor(Math.random() * mot.length)]

// import du bouton reload
const reload = document.querySelector("#reload")

// Prend le mot aléatoire et le divise dans un tableau
const letter = mot_aleator.split('');

// importer l'image 
const pendu = document.querySelector(".image img")

// variable pour afficher le nom d'essaie restant 
let essais_restant = 7

// H2 ou sera afficher le nombre d'essais restant 
const compteur = document.querySelector("#compteur")

// ajoute des const pour la music 
const win_sound = document.querySelector("#win_music")
const loose_sound = document.querySelector("#loose_music")

// variable étoile vide 
let stars = ""

// nombre d'essaie
let essaie = 0

// ! ==================================================function/boucle==================================================

// désactiver le bouton reload 
reload.style.display = "none";

// Boucle pour transformer le mot en étoile
for(let i = 0; i < mot_aleator.length; i++){
    stars += "*"
}

// Affiche le mot aléatoire avec les étoile 
host_mot.textContent = `${stars}`

console.log(mot_aleator);

// Fonction pour mettre à jour les étoiles
function mettreAJourEtoiles(index, lettre) {

    // Convertir la chaîne de caractères 'stars' en un tableau de caractères
    let starsArray = stars.split("");

    // Remplacer le caractère à l'indice 'index' par la lettre spécifiée
    starsArray[index] = lettre;

    // Rejoindre les éléments du tableau pour reconstruire la chaîne 'stars' modifiée
    stars = starsArray.join("");

    // Mettre à jour le contenu texte de l'élément 'host_mot' avec la nouvelle valeur de 'stars'
    host_mot.textContent = `${stars}`;
}



// fonction win
function win(){

    // lancer la musique de win
    win_sound.play()

    // On récupère #endgame et le définie dans une variable 
    let endgame = document.querySelector("#endgame")

    // on ajoute du texte a endgame 
    endgame.textContent = "Félicitation, vous avez gagné !"

    // activer le button reload
    reload.style.display = "block";

        // on efface le compteur
        compteur.textContent = ""

    //  on désactive tous les bouton 
    for(let i = 0; i < key.length; i++){
        key[i].disabled = true
    }
}

//  fonctionne loose
function loose(){

    // lancer la musique de loose
    loose_sound.play()

    // On récupère #endgame et le définie dans une variable 
    let endgame = document.querySelector("#endgame")

    // on ajoute du texte a endgame 
    endgame.textContent = "Vous avez perdu !"

    // activer le button reload
    reload.style.display = "block";

    // on met l'image final 
    pendu.style.transform = "translate(-725px, 0px)"

    // on affiche le mot sans étoile
    host_mot.textContent = mot_aleator;

    // on efface le compteur
    compteur.textContent = ""

    //  on désactive tous les bouton 
    for(let i = 0; i < key.length; i++){
        key[i].disabled = true
    }
}

// Compare le button cliqué avec le mot aléatoire
function action(key) {

    // Variable Boolèen pour vérifier si c'est bon 
    let isfine = false; 

    letter.forEach(function(contenue, index){

        //  si l'utilisateur fait une bonne entré, on désactive la touche et change l'étoile en lettre 
        if(contenue === key.textContent.toLowerCase()){
            key.disabled = true
            isfine = true

            // si il n'y a plus d'étoile alors l'utilisateur a gagné et on lance la fonction win 
            mettreAJourEtoiles(index, contenue);
            if (stars.indexOf("*") === -1){
                win();


            }
        }
    })
    // si l'utilisateur fait une mauvaise entré on ajoute 1 a essaie et on décale l'image
    if(isfine===false){

        // on ajoute 1 a essaie a chaque fois que l'utilisateur se trompe 
        essaie += 1

        // on retire 1 a essais_restant a chaque fois que l'utilisateur se trompe
        essais_restant -=1

        // on affiche dans compteur le nombre d'essaie restant
        compteur.textContent = `${essais_restant} erreurs restantes !`
        
        if(essaie === 2){
            pendu.style.transform = "translate(-122px, 0px)"
        }
        if(essaie === 3){
            pendu.style.transform = "translate(-241px, 0px)"
        }
        if (essaie === 4){
            pendu.style.transform = "translate(-370px, 0px)"
        }
        if(essaie === 5){
            pendu.style.transform = "translate(-485px, 0px)"
        }
        if (essaie === 6){
            pendu.style.transform = "translate(-608.5px, 0px)"
        }
         // si essaie atteint 7 on lance la function loose  
        if (essaie === 7){
            loose();
    
        }
    }
}

// lancement de la function action dans une boucle 
for(let i = 0; i < key.length; i++) {
    key[i].addEventListener("click", function() {
        action(key[i]);
    })
}

// button reload
reload.addEventListener("click", function(){
    action(location.reload()) 
})








