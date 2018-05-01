
		<?php 
		/* join.php */

		//include db configuration file
		include_once("config.php");


				if($_POST)
				{
				/* VALUES */
				$idUser=$_POST['idUser'];
				$score=$_POST['precoresnom'];
				$adresse=$_POST['adresse'];
				$zip=$_POST['zip'];
				$ville=$_POST['ville'];
				$telephone=$_POST['telephone'];
				$email=$_POST['email'];

				$datetime = date('Y-m-d H:i:s');

				mysql_query("INSERT INTO people (nom, prenom, adresse, zip, ville, telephone, email, created_on, updated_on) VALUES ( '".utf8_decode($nom)."', '".utf8_decode($prenom)."', '".utf8_decode($adresse)."', '".utf8_decode($zip)."', '".utf8_decode($ville)."', '".utf8_decode($telephone)."', '".utf8_decode($email)."', '".$datetime."','".$datetime."')");
				} else { 

						header('HTTP/1.1 500 Looks like mysql error, could not insert record!');
						exit();
				}

		?>