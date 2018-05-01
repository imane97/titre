<?php
//Cette fonction doit être appelée avant tout code html
session_start();

//On donne ensuite un titre à la page, puis on appelle notre fichier debut.php
$titre = "Index du forum";
include("includes/identifiants.php");
include("includes/debut.php");
include("includes/menu.php");

echo'<i>Vous êtes ici : </i><a href ="./index.php">Index du forum</a>';
?>
<h1>Mon super forum</h1>

<?php
//Initialisation de deux variables
$totaldesmessages = 0;
$categorie = NULL;
//Cette requête permet d'obtenir tout sur le forum
$query=$db->prepare('SELECT idUser, idJeux, score, idPartie
FROM UserPartie
-- LEFT JOIN forum_forum ON forum_categorie.cat_id = forum_forum.forum_cat_id
-- LEFT JOIN forum_post ON forum_post.post_id = forum_forum.forum_last_post_id
-- LEFT JOIN forum_topic ON forum_topic.topic_id = forum_post.topic_id
-- LEFT JOIN forum_membres ON forum_membres.membre_id = forum_post.post_createur
-- WHERE auth_view <= :lvl 
-- ORDER BY cat_ordre, forum_ordre DESC');
// -- $query->bindValue(':lvl',$lvl,PDO::PARAM_INT);
// -- $query->execute();

?>
