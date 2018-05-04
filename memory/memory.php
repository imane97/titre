<?php 
// Connexion àla bdd test 
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=test;charset=utf8', 'root', 'root');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}
$nom = $_GET['nom'];
$score = $_GET['score'];
$nomJeu = $_GET['nomJeu'];
if(isset($nom)==true&&isset($score)==true&&isset($nomJeu)==true){
$req = $bdd->prepare('INSERT INTO UserPartie(nom, score, nomJeu) VALUES(:nom, :score, :nomJeu)');
$req->execute(array(
    'nom'=>$nom,
    'score'=>$score,
    'nomJeu'=>$nomJeu
));
echo $nom.$score.$nomJeu;
echo "hello";
}

?>