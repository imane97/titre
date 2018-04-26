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
$req = $bdd->prepare('SELECT * FROM casseBrique');
$req->execute(array($_GET['étoile'], $_GET['temps']));

echo '<ul>';

while ($donnees = $req->fetch())
{
	echo '<li>' . $donnees['date']  . $donnees['étoiles'] . $donnees['temps']. '</li>';
}
echo '</ul>';

$req->closeCursor();

// Insérer dans la base de données 
$req = $bdd->prepare('INSERT INTO test(id, date, étoile, temps) VALUES(:id, :date, :étoile, :temps');
$req->execute(array(
	'id' => $id,
	'date' => $date,
	'étoile' => $étoile,
	'temps' => $temps
	));
?>

<p>    Ici on remplit le champ de la date : 
<input type="text" value="$id">
<input type="text" value="$date">
<input type="text" value="$étoile">
<input type="text" value="$temps">

<?php
echo 'id = ' . $donnees.['id'];
echo 'date = ' . $donnees.['date'];
echo 'étoile = ' . $donnees.['étoile'];
echo 'temps  = ' . $donnees.['temps'];

?>
</p>


