var tab = new Array();
var tab2 = new Array();
for(var i=0; i<9; i++){
	tab.push(false);
	tab2.push(0);
}
var croix = "west.jpeg";
var rond = "doigt.png";
var cpt = 0;
var i = 0;
var joueur1='westCoast';
var joueur2='Honneur';

function initialisation(){
	var i=0;
	while(i<9){
		document.images[i].src="vide.png";
		tab[i]=false;
		tab2[i]="0";
		i++;
	}
}

function verifier(a,b,c){
	var the_end=true;
	for(var i=0; i<9; i++){
		if(tab2[i]==0){the_end=false; break;}
	}
	if(the_end){
		alert("Match nul");
		toReturn=initialisation();
	}else{
		var toReturn=false;
		if (tab2[a]==1 && tab2[b]==1 && tab2[c]==1){
			window.alert("WestCoast gagne !");
			toReturn=initialisation();
		}else if(tab2[a]==2 && tab2[b]==2 && tab2[c]==2){
			window.alert("Honneur gagne !");
			toReturn=initialisation();
		}
	}
	return toReturn;
}

function gagnant(){
	var verif = false;
	return (verifier(0,1,2) || verifier(3,4,5) || verifier(6,7,8) || verifier(0,3,6) || verifier(1,4,7) || verifier(2,5,8) || verifier(0,4,8) || verifier(2,4,6))?true:false;
}

function joue(n){
	if(!tab[n]){
		if(cpt%2==0){
			document.images[n].src = croix;
			tab2[n]=1;
			document.getElementById('player').innerHTML="C'est au tour de :"+joueur2;
		}else{
			document.images[n].src = rond;
			tab2[n]=2;
			document.getElementById('player').innerHTML="C'est au tour de :"+joueur1;
		}
		tab[n]=true;
	}else{
		window.alert("Impossible");
		cpt--;
	}
	cpt++;
	gagnant();
}

window.onload=function(){
	document.getElementById('player').innerHTML="C'est au tour de :"+joueur1;
}
