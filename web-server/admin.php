<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="./images/logo_icon.jpg">
    <title>Admin</title>
    <link rel="stylesheet" href="./css/style.css">
    <?php include('function.php'); ?>
</head>
<body>
    <?php
    session_start();

    // Liste des utilisateurs autorisés
    $utilisateursAutorises = [82372354, 114753198, 83721477];

    // Vérifiez si l'utilisateur est connecté et autorisé
    $idUtilisateur = $_SESSION['user_id'] ?? 0; // Remplacez par la méthode d'authentification réelle
    if (!in_array($idUtilisateur, $utilisateursAutorises)) {
        echo "<p>Accès refusé</p>";
        exit;
    }

    // Traitement de la soumission du formulaire
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ids'])) {
        $nouveauxIds = explode(',', $_POST['ids']); // Séparer les IDs par des virgules
        $utilisateursAutorises = array_map('intval', $nouveauxIds); // Convertir en entiers
        // Enregistrez les modifications ici, par exemple, en écrivant dans un fichier ou une base de données
    }

    // Affichage du formulaire
    echo "<form action='admin.php' method='post'>";
    echo "<label for='ids'>Modifier les IDs autorisés :</label>";
    echo "<input type='text' id='ids' name='ids' value='".implode(',', $utilisateursAutorises)."'>";
    echo "<input type='submit' value='Enregistrer'>";
    echo "</form>";

    // Afficher la liste des utilisateurs autorisés
    echo "<h2>Liste des Utilisateurs Autorisés</h2>";
    foreach ($utilisateursAutorises as $id) {
        echo "<p>ID: $id</p>";
    }
    ?>
</body>
</html>
