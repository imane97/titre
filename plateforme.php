<?php 
// Connexion àla bdd test
$bdd = new PDO('mysql:host=localhost;dbname=test;charset=utf8', 'root', 'root');  
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=test;charset=utf8', 'root', 'root');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}

// Récupérerce qu'il y a dans la bdd et l'afficher 
$req = $bdd->prepare('SELECT * FROM UserPartie');
$req->execute(array($_GET['nom'], $_GET['nomjeu'], $_GET['score']  ) );

echo ' <link rel="stylesheet" href="index.css">' ;
echo  '<link href="https://fonts.googleapis.com/css?family=Amatic+SC:700" rel="stylesheet">' ;
echo '<div class="nav"> <a href="index.html"> Home </a> </div>' ;
echo '<ol>';

while ($donnees = $req->fetch())
{
	echo '<li> Pseudo: ' . $donnees['nom'] .'</li>'.'<li> Jeux :' . $donnees['nomJeu'] .'</li>'.'<li> Score : '. $donnees['score']. '</li>';
}
echo '</ol>';

$req->closeCursor();

// Insérer dans la base de données 


