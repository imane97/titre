<?php
session_start();
$titre="Enregistrement";
include("includes/identifiants.php");
include("includes/debut.php");
include("includes/menu.php");
// echo '<p><i>Vous sêtes ici</i> : <a href="./index.php">Index du forum</a> --> Enregistrement';

if ($id!=0) erreur(ERR_IS_CO);
?>


<?php
if (empty($_POST['idUser'])) // Si on la variable est vide, on peut considérer qu'on est sur la page de formulaire
{
	echo '<h1>Inscription</h1>';
	echo '<form method="post" action="register.php" enctype="multipart/form-data">
    <fieldset>
    <legend>Identifiants</legend>
	<label for="idUser">* Pseudo :</label>  <input name="idUser" type="text" id="idUser" /> (le pseudo doit contenir entre 3 et 15 caractères)<br />
	<label for="mdp">* Mot de Passe :</label><input type="password" name="mdp" id="mdp" /><br />
	<label for="confirm">* Confirmer le mot de passe :</label><input type="password" name="confirm" id="confirm" />
    <label for="email">* Votre adresse Mail :</label><input type="text" name="email" id="email" /><br />
    </fieldset>
	<p>Les champs précédés de * sont obligatoires</p>
	<p><input type="submit" value="S\'inscrire" /></p></form>
	</div>
	</body>
	</html>';
	
	
} //Fin de la partie formulaire

else //On est dans le cas traitement
{
    $idUser_erreur1 = NULL;
    $idUser_erreur2 = NULL;
    $mdp_erreur = NULL;
    $email_erreur1 = NULL;
    $email_erreur2 = NULL;     ///déclaration et affectation des variables 

    //On récupère les variables
    $i = 0;      // => Cette var ser à stocker le nombre d'erreurs 
    // $temps = time(); 
    $idUser=$_POST['idUser'];
    $email = $_POST['email'];
    $mdp = md5($_POST['mdp']);
    $confirm = md5($_POST['confirm']);
	
    //Vérification du pseudo
    // Comparer avec ce qu'il y a dans la bdd
    $query=$db->prepare('SELECT idUser FROM user WHERE idUser =:idUser');
    $query->bindValue(':idUser',$idUser, PDO::PARAM_STR);
    $query->execute();
    $idUser_free=($query->fetchColumn()==0)?1:0;
    $query->CloseCursor();

    // Erreurs
    if(!$idUser_free)
    {
        $idUser_erreur1 = "Pseudo déjà utilisé.";
        $i++;
    }

    if (strlen($idUser) < 3 || strlen($idUser) > 15) //=> Fonction strlen qui retourne le nombre de caractère
    {
        $idUser_erreur2 = "Votre pseudo doit contenir entre 3 et 15 caractères.";
        $i++;
    }

    //Vérification du mdp
    if ($mdp != $confirm || empty($confirm) || empty($mdp)) //On vérifie si la confirmation est remplie ou différente du mdp
    {
        $mdp_erreur = "Confirmation différente du mot de passe.";
        $i++;
    }

    if ($i==0)
   {
    //    Message de confirmation d'inscription
	echo'<h1>Inscription terminée</h1>';
        echo'<p>Bienvenue '.stripslashes(htmlspecialchars($_POST['idUser'])).' Sur la plateforme de jeux 3D</p>
	<p>Cliquez <a href="./index.php">ici</a> pour revenir à la page d accueil</p>';
    
    // Requête pour insérer les informations valides dans la bdd 
        $query=$db->prepare('INSERT INTO user (idUser, mdp, email)
        VALUES (:idUser, :mdp, :email');
	$query->bindValue(':idUser', $idUser, PDO::PARAM_STR);
	$query->bindValue(':mdp', $mdp, PDO::PARAM_INT);
	$query->bindValue(':email', $email, PDO::PARAM_STR);
        $query->execute();

	//Et on définit les variables de sessions
        $_SESSION['idUser'] = $idUser;
        $_SESSION['email'] = $db->lastInsertId(); ;
        $_SESSION['mdp'] = $mdp;
        $query->CloseCursor();
    }
    else
    {
        echo'<h1>Inscription interrompue</h1>';
        echo'<p>Une ou plusieurs erreurs se sont produites pendant l incription</p>';
        echo'<p>'.$i.' erreur(s)</p>';
        echo'<p>'.$idUser_erreur1.'</p>';
        echo'<p>'.$idUser_erreur2.'</p>';
        echo'<p>'.$mdp_erreur.'</p>';
        echo'<p>'.$email_erreur1.'</p>';
        echo'<p>'.$email_erreur2.'</p>';
        echo'<p>Cliquez <a href="./register.php">ici</a> pour recommencer</p>';
    }
}
?>
</div>
</body>
</html>

