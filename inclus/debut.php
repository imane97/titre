<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" >
<head>
<?php
//Si le titre est indiqué, on l'affiche entre les balises <title>
echo (!empty($titre))?'<title>'.$titre.'</title>':'<title> Forum </title>';
?>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link rel="stylesheet" media="screen" type="text/css" title="Design" href="../index.css" />
</head>
<?php

//Attribution des variables de session
$email=(isset($_SESSION['email']))?(int)$_SESSION['email']:1;
$mdp=(isset($_SESSION['mdp']))?(int) $_SESSION[':mdp']:0;
$idUser=(isset($_SESSION['idUser']))?$_SESSION['idUser']:'';

//On inclue les 2 pages restantes
include("./includes/functions.php");
include("./includes/constants.php");
?>
