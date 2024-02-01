<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="./images/logo_icon.jpg">
        <title>Home</title>
        <link rel="stylesheet" href="./css/style.css">
        <?php include('function.php'); ?>
    </head>

    <body>
        <div class="container">
            <div class="column1">
                <div class="card">
                    <?php
                        require('config.php');
                        if (isset($_GET['user_id'])) {
                            $userId = $_GET['user_id'];

                            $query = "INSERT into `cloudsecureid` (id_github) VALUES ('$userId')";
                            $res = mysqli_query($conn, $query);
                            if($res){
                                echo "<h4>L'utilisateur avec l'ID $userId a été ajouté à la liste des utilisateurs autorisés.</h4>";
                            }
                        }
                    ?>
                </div>
            </div>
        </div>
    </body>
</html>
