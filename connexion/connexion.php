<?php 
	 
	mysql_close($connecDB);
session_start();
$titre="Connexion";
include("includes/identifiants.php");
include("includes/debut.php");
include("includes/menu.php");
// echo '<p><i>Vous êtes ici</i> : <a href="./index.php">Index du forum</a> --> Connexion';

echo '<h1>Connexion</h1>';
if ($id!=0) erreur(ERR_IS_CO);    //Si l'id est différent de 0 cela veut dire que l'user s'est déjà conecté
?>

  <input type="hidden" name="page" value="<?php echo $_SERVER['HTTP_REFERER']; ?>" /> 
  <!-- Cet input ci dessus seers à retenir la viste de la pagede connexion -->


<?php
//On est dans la page de formulaire
if (!isset($_POST['idUser'])) 
{
	echo '<form method="post" action="connexion.php">
	<fieldset>
	<legend>Connexion</legend>
	<p>
	<label for="idUser">Pseudo :</label><input name="idUser" type="text" id="idUser" /><br />
	<label for="mdp">Mot de Passe :</label><input type="password" name="mdp" id="mdp" />
	</p>
	</fieldset>
    <p><input type="submit" value="Connexion" /></p></form>
	<a href="../register/register.php">Pas encore inscrit ?</a>
	 
	</div>
	</body>
	</html>';
}
else
{
    $message='';
    //Oublie d'un champ
    if (empty($_POST['idUser']) || empty($_POST['mdp']) ) 
    {
        $message = '<p>une erreur s\'est produite pendant votre identification.
	Vous devez remplir tous les champs</p>
	<p>Cliquez <a href="./connexion.php">ici</a> pour revenir</p>';
    }
    //On check le mot de passe
    else 
    {
        $query=$db->prepare('SELECT * FROM user WHERE idUser = :idUser');
        $query->bindValue(':idUser',$_POST['idUser'], PDO::PARAM_STR);  //On associe la variable pseudo à la valeur post pseudo 
        $query->execute();
        $data=$query->fetch();
	if ($data['idUser'] == md5($_POST['mdp'])) // Acces OK !
	{
	    $_SESSION['idUser'] = $data['idUser'];
	    $_SESSION['mdp'] = $data['mdp'];
	    $message = '<p>Bienvenue '.$data['idUser'].', 
			vous êtes maintenant connecté!</p>
			<p>Cliquez <a href="/index.php">ici</a> 
			pour revenir à la page d accueil</p>';  
	}
	else // Acces pas OK !
	{
	    $message = '<p>Une erreur s\'est produite 
	    pendant votre identification.<br /> Le mot de passe ou le pseudo 
            entré n\'est pas correct.</p><p>Cliquez <a href="./connexion.php">ici</a> 
	    pour revenir à la page précédente
	    <br /><br />Cliquez <a href="./index.php">ici</a> 
	    pour revenir à la page d accueil</p>';
	}
    $query->CloseCursor();
    }
    $page = htmlspecialchars($_POST['page']);
echo 'Cliquez <a href="'.$page.'">ici</a> pour revenir à la page précédente';
    echo $message.'</div></body></html>';

}
?>
