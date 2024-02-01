<?php
include('function.php'); // Assurez-vous que cette fonction peut gérer la mise à jour de la liste

if (isset($_GET['user_id'])) {
    $userId = $_GET['user_id'];

    // Ajoutez la logique pour ajouter l'utilisateur à la liste des utilisateurs autorisés
    // Par exemple, mettre à jour un fichier ou une base de données

    echo "L'utilisateur avec l'ID $userId a été ajouté à la liste des utilisateurs autorisés.";
}
?>
