var grid="";
var tableau=[];
var arrayOfImages = [
  'images/1.jpg',
  'images/2.jpg',
  'images/3.jpg',
  'images/4.jpg',
  'images/5.jpg',
  'images/6.jpg',
  'images/7.jpg',
  'images/8.jpg',
  'images/9.jpg',
  'images/10.jpg',
  'images/guts.png',
  'images/panda.jpg',
];
var figure = $('figure');
var img= $('img');
score = 0; 
afficheScore= '';
gagne = 0;
message = 'Super tu as retourné toutes tes cartes avec un score de : ';


$(function() {
$(".submit").click(function() {

  /* VALUES */
    var nom = $("#nom").val();

  /* DATASTRING */
    var dataString = 'nom=';



  if(nom=='') {
  $('.success').fadeOut(200).hide();
    $('.error').fadeOut(200).show();
  /* UNCOMMNENT TO SEND TO CONSOLE */
  console.log ("SOMETHING HAPPENS"); 
  } else {
  $.ajax({
  type: "POST",
    url: "join.php",
    data: dataString,
      success: function(){
      $('.success').fadeIn(200).show();
        $('.error').fadeOut(200).hide();
      /* UNCOMMNENT TO SEND TO CONSOLE */
    
      console.log (dataString);	
      console.log ("AJAX DONE");
      
       }
  });
    }//EOC
   return false;
  }); //EOF



});
//  END



// Envoyer score à bdd
function sendScore(){
  $('#form').removeClass('invisibleForm').addClass('visibleForm'); 
  
}
// Gagner
function Gagner(){
  var invisible = $(".invisible"); 
  if(tableau.length == invisible.length ){
    $('header').append(message)
    sendScore();
  }
  //  $('.invisible')
}

// Gérer le score 
function Score(){
  afficheScore= '<h2 class="score"> Score : '+score+'</h2>'; 
$('header').html(afficheScore); //J'utilise html et pas 
Gagner();
}

for (var i =0; i<arrayOfImages.length/6; i++){
  tableau.push(arrayOfImages[i]);
  tableau.push(arrayOfImages[i]); 
};                              // On push deux fois les images dans le tableau 

/*  Mélanger les valeurs comprises dans le tableau */
function Rand_Tableau(tab){
  var i;
  var Num;
  var Nbr = tab.length;
  var Tab = tab;

  while( Nbr> 0){  //-- Lance la boucle
    Num = Math.floor(Math.random() * Nbr);    //-- Recup nombre aleatoire
    Nbr--;  //-- 1 de moins a traiter
    szTmp = Tab[Num];  //-- Stock element tire
    for( i= Num; i < Nbr; i++)  //-- Decalage des valeurs du tableau
    Tab[i] = Tab[i+1]
    Tab[ Nbr] = szTmp;  //-- Stock l'element tire en fin
  }
  //-- On peut remettre dans l'ordre du tirage
  Tab.reverse();
  //-- Retourne resultat
  return( Tab);
}
Rand_Tableau(tableau);

/*  Dans la var grid on met les images mais aussi le code html pour qu'elles s'affichent correctement */
for (var i=0; i<tableau.length; i++){
  grid += "<figure><img src='"+tableau[i]+"'/></figure>";

}

$("#cards").append(grid);

var imgUrl1 ="";
var imgUrl2 ="";
$("figure").click(function() {
  var nbshow = $(".show").length;
  console.log(nbshow);
  if (nbshow<2) {
    $(this).addClass("show");
    if(nbshow ===0) {
      imgUrl1 = $(this).find("img").attr("src");
    } else if (nbshow ===1) {
      imgUrl2 = $(this).find("img").attr("src");
      console.log("boucle deux cartes tournées");
    };
    if (nbshow===1) {
      if (imgUrl1 === imgUrl2) {
        setTimeout(function() {
        $(".show").addClass("invisible");
            $(".show").removeClass("show");
            score++; 
            Score();
            console.log("Score = "+score);
          }, 1500);
          console.log("boucle 2 même cartes de tournées")
      } else {
        setTimeout(function() {
          $(".show").removeClass("show");
          score--;
          Score();
          console.log("Score = "+score);
        }, 1000);
      }
    }
  }
});



