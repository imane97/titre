var tab = new Array();
var tab2 = new Array();


var croix = "west.jpeg";
var rond = "doigt.png";
var cpt = 0;
var i = 0;
var joueur1='Premier Joueur';
var joueur2='Second Joueur';

var nomJeu = 'Morpion';

function initialisation(){
	var i=0;
	while(i<9){ //9 cases de jeu
		document.images[i].src="../images/fond.jpg"; //On remplis le tableau d'images de blanc
		tab[i]=false;  //On remplis le tab de false
		tab2[i]="0";   //Et le tab2 de zéro
		i++;
	}
}

function verifier(a,b,c){
	var matchNull=true;
	var score = 0;
	var idUser = "";
	for(var i=0; i<9; i++){
		if(tab2[i]==0){
			matchNull=false; // Si le tab2 est remplis de zéro c'est que la partie 
			break; // vient de commencer, on remet match null à false
		}        
	}
	if(matchNull){
		window.alert("Match Nul ");
		toReturn=initialisation();   // Si match null on informe les users et on relance le jeu 
	}else{
		var toReturn=false;
		if (tab2[a]==1 && tab2[b]==1 && tab2[c]==1){
			score++;
            var idUser = "joueur2";
			window.alert("Premier Joueur gagne "+score+" point! " );// Si le tab2 est rempli de 1 c'est que le premier jouer a gagné,
			sendScore();
			toReturn=initialisation(); // On relance le jeu
		}else if(tab2[a]==2 && tab2[b]==2 && tab2[c]==2){
			score++; 
			var idUser = "joueur1";
			window.alert("Second Joueur "+score+" point! "); // Si le tab2 est rempli de 1 c'est que le premier jouer a gagné, 
			sendScore();
			toReturn=initialisation(); // On relance le jeu
		}
	}
	return toReturn;
}

function gagnant(){
	var verif = false;
	return (verifier(0,1,2) || verifier(3,4,5) || verifier(6,7,8) || verifier(0,3,6) || verifier(1,4,7) || verifier(2,5,8) || verifier(0,4,8) || verifier(2,4,6))?true:false;
}   //Fonction vérifier pour voir si un joueur est gagnant


  // Faire apparaître le  formulaire
  function sendScore(){
	  var form = document.getElementById('form');
	//   console.log(form);
	  form.classList.remove('invisibleForm');
	  sendbdd();

	}
  // Envoyer à la bdd
  function sendbdd(){
  var submit = document.getElementsByClassName('submit'); 
  console.log(submit);
  submit.onclick = function envoyer (e){
	  conole.log(e);
	  console.log("dans la fonction");
	  var nom = document.getElementById('nom'); //nom =valeur de l'input
       console.log("la valeur du nom : "+nom);
	  if(nom!=null){
		var xhr_object = new XMLHttpRequest(); 
			xhr_object.open("POST", morpion.php, true); 
			xhr_object.send(nom+score+nomJeu); 
			 
			if (xhr_object.readyState == 4) alert("Requête effectuée !"); 
		
	  }
  }
}

function joue(n){ //Depuis le front n = position de la case sélectionnée
	if(!tab[n]){  //Case à false = case libre
		if(cpt%2==0){ //Si le cpt est un nombre pair => C'est au tour de joueur 2
			document.images[n].src = croix; //on insère une image de croix ds le front
			tab2[n]=1; //Et un 1 dans le tab
			document.getElementById('player').innerHTML="Go :"+joueur2;
		}else{
			document.images[n].src = rond; //de même pour l'img de rond
			tab2[n]=2;
			document.getElementById('player').innerHTML="Go:"+joueur1;
		}
		tab[n]=true;  //On bloque la case
	}else{
		window.alert("Cette case est déjà prise");
		cpt--; //Case déjà prise, on annule coup 
	}
	cpt++;
	gagnant();
}

window.onload=function(){
	document.getElementById('player').innerHTML="Go :"+joueur1;
}
