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
$req->execute(array($_GET['idUser'], $_GET['idJeux'], $_GET['score']  ) );

echo '<ul>';

while ($donnees = $req->fetch())
{
	echo '<li>' . $donnees['idUser']  . $donnees['idJeux'] . $donnees['score']. '</li>';
}
echo '</ul>';

$req->closeCursor();

// Insérer dans la base de données 


