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
    <?php

    $errorOccurred = false; // Variable pour suivre si une erreur s'est produite

    // Vérifie si le jeton d'accès a été transmis dans le corps de la requête POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Récupère le jeton d'accès depuis le corps de la requête
        $accessToken = isset($_POST['access_token']) ? $_POST['access_token'] : null;

        if ($accessToken) {
            // Utilise le jeton d'accès comme nécessaire
            //echo "Token reçu avec succès : $accessToken";

            // Utilisez le token pour effectuer d'autres opérations
            $url = 'https://api.github.com/user';

            $options = array(
                'http' => array(
                    'header' => "Authorization: Bearer $accessToken\r\n" . "User-Agent: $userAgent\r\n",
                    'method' => 'GET',
                ),
            );

            $context = stream_context_create($options);
            $result = file_get_contents($url, false, $context);

            // Vérifiez si une erreur s'est produite lors de la requête
            if ($result === FALSE) {
                $errorOccurred = true; // Mettez la variable d'erreur à vrai
                echo '<div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading" style="color: white;">Erreur</h4>
                        <p>Erreur : Une erreur s\'est produite lors de la requête vers l\'API GitHub.</p>
                        <hr>
                        <p class="mb-0">Erreur Handler by Antoine</p>
                        </div>';
            }

            // Parsez le résultat pour obtenir des informations sur l'utilisateur
            $userInfo = json_decode($result, true);

            // Vérifiez si une erreur s'est produite lors de la conversion JSON
            if ($userInfo === NULL) {
                $errorOccurred = true; // Mettez la variable d'erreur à vrai
                echo '<div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">Erreur</h4>
                        <p>Erreur : Impossible de traiter les informations de l\'utilisateur.</p>
                        <hr>
                        <p class="mb-0">Erreur Handler by Antoine</p>
                    </div>';
            }

            // Maintenant, $userInfo contient des informations sur l'utilisateur
            $username = $userInfo['login'];
            $id = $userInfo['id'];    
            $url = $userInfo['html_url'];
            $bio = $userInfo['bio'];
            $img = $userInfo['avatar_url'];
            $followers = $userInfo['followers'];
            $following = $userInfo['following'];
            $twitter_username = $userInfo['twitter_username'];

            $utilisateurAutoriseId = 82372354;
            $peutCliquer = ($id === $utilisateurAutoriseId);

        } else {
            // Cas où le jeton d'accès n'a pas été fourni
            $errorOccurred = true; // Mettez la variable d'erreur à vrai
            echo '<div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">Erreur</h4>
                    <p>Erreur : Le jeton d\'accès est manquant.</p>
                    <hr>
                    <p class="mb-0">Erreur Handler by Antoine</p>
                </div>';
        }

    } else {
        // Gérer le cas où la requête n'est pas une requête POST
        $errorOccurred = true; // Mettez la variable d'erreur à vrai
        echo '<div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Erreur</h4>
                <p>Erreur : Cette page attend une requête POST avec un jeton d\'accès.</p>
                <hr>
                <p class="mb-0">Erreur Handler by Antoine</p>
              </div>';
    }

    // Si aucune erreur ne s'est produite, affichez le reste du contenu
    if (!$errorOccurred) {

        navigation();
        ?>



<div class="container">
    <div class="column1">
        <div class="card">
            <img src="<?php echo $img;?>">
            <div class="card-body">
                <h3 class="uppercase"><strong>BIENVENUE <?php echo $username; ?> !</strong></h3>
                <h4><strong>ID : </strong><?php echo $id; ?></h4>
                <h4><strong>Bio : </strong><?php echo $bio; ?></h4>
                <h4><strong><?php echo $followers; ?></strong> followers</h4>
                <h4><strong><?php echo $following; ?></strong> following</h4>
            </div>
            <div class="card-body">
                <a href="<?php echo $url; ?>" class="card-link" target="_blank">Voir mon profil GitHub</a>
            </div>
            <?php if ($peutCliquer): ?>
            <a href="https://www.youtube.com/watch?v=zBukbgTN0cE" target="_blank">
                <button>Regarder la vidéo</button>
            </a>
            <?php else: ?>
            <button class="disabled">Non autorisé</button>
            <?php endif; ?>
        </div>
    </div>
    <div class="column2">
        <div class="line1">
            <h1>Alertes</h1>
            <h3>Aucune alerte</h3>
        </div>
        <div class="line2">
            <button id="btn1" class="responsive-button" onclick="buttonClicked(this, 'btn2', 'Déploiement créé')">
                <ion-icon name="play-outline"></ion-icon>
                <span>Création du déploiement</span>
            </button>
            <button id="btn2" class="responsive-button" onclick="buttonClicked(this, 'btn3', 'Code vérifié')" disabled>
                <ion-icon name="close-outline" style="color: red;"></ion-icon>
                <span>Vérification du code</span>
            </button>
            <button id="btn3" class="responsive-button" onclick="buttonClicked(this, 'btn4', 'Sécurité confirmée')" disabled>
                <ion-icon name="close-outline" style="color: red;"></ion-icon>
                <span>Vérification de la sécurité</span>
            </button>
            <button id="btn4" class="responsive-button" onclick="buttonClicked(this, null, 'Prêt pour le déploiement')" disabled>
                <ion-icon name="close-outline" style="color: red;"></ion-icon>
                <span>Déploiement terminé</span>
            </button>
        </div>
    </div>
</div>

<?php } ?>
<script src="./js/api.js"></script>
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script>
        const socket = new WebSocket('ws://6.tcp.eu.ngrok.io:17648');

        socket.addEventListener('open', function (event) {
            socket.send('Connection Established');
        });

        socket.addEventListener('message', function (event) {
            console.log(event.data);
        });

        const contactServer = () => {
            socket.send("Debut du deploiement");
        }

        
function buttonClicked(button, nextButtonId, newText) {
    button.innerHTML = '<ion-icon name="checkmark-outline" style="color: green;"></ion-icon><span>' + newText + '</span>';
    button.disabled = true;

    if (nextButtonId) {
        var nextButton = document.getElementById(nextButtonId);
        if (nextButton) {
            nextButton.disabled = false;
            nextButton.innerHTML = '<ion-icon name="play-outline"></ion-icon><span>' + nextButton.textContent.trim() + '</span>';
        }
    }
}



</script>
</body>
 
</body>

</html>
