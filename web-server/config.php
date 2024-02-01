<?php
// Informations d'identification
define('DB_SERVER', 'thmsczsadmin.mysql.db');
define('DB_USERNAME', 'thmsczsadmin');
define('DB_PASSWORD', 'ikyp9h1e6OpfbAiJoOMU');
define('DB_NAME', 'thmsczsadmin');
 
// Connexion à la base de données MySQL 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Vérifier la connexion
if($conn === false){
    die("ERREUR : Impossible de se connecter. " . mysqli_connect_error());
}
?>