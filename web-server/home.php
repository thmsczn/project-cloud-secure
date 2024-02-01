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
    $errorOccurred = false;

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $accessToken = isset($_POST['access_token']) ? $_POST['access_token'] : null;

        if ($accessToken) {
            $url = 'https://api.github.com/user';
            $options = [
                'http' => [
                    'header' => "Authorization: Bearer $accessToken\r\nUser-Agent: $userAgent\r\n",
                    'method' => 'GET',
                ],
            ];

            $context = stream_context_create($options);
            $result = file_get_contents($url, false, $context);

            if ($result === FALSE) {
                $errorOccurred = true;
                echo '<div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading" style="color: white;">Erreur</h4>
                        <p>Erreur : Une erreur s\'est produite lors de la requête vers l\'API GitHub.</p>
                        <hr>
                        <p class="mb-0">Erreur Handler by Antoine</p>
                      </div>';
            }

            $userInfo = json_decode($result, true);

            if ($userInfo === NULL) {
                $errorOccurred = true;
                echo '<div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">Erreur</h4>
                        <p>Erreur : Impossible de traiter les informations de l\'utilisateur.</p>
                        <hr>
                        <p class="mb-0">Erreur Handler by Antoine</p>
                      </div>';
            }

            // Additional user information variables
            $username = $userInfo['login'];
            $id = $userInfo['id'];
            $url = $userInfo['html_url'];
            $bio = $userInfo['bio'];
            $img = $userInfo['avatar_url'];
            $followers = $userInfo['followers'];
            $following = $userInfo['following'];
            $twitter_username = $userInfo['twitter_username'];
            $mail = $userInfo['email'];

            require_once "config.php";

            try {
                $pdo = new PDO("mysql:host=".DB_SERVER.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $stmt = $pdo->prepare("SELECT id_github FROM cloudsecureid");
                $stmt->execute();

                $utilisateursAutorises = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

                $peutCliquer = in_array($id, $utilisateursAutorises);

            } catch (PDOException $e) {
                echo "Erreur de connexion à la base de données: " . $e->getMessage();
            }

        } else {
            $errorOccurred = true;
            echo '<div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">Erreur</h4>
                    <p>Erreur : Le jeton d\'accès est manquant.</p>
                    <hr>
                    <p class="mb-0">Erreur Handler by Antoine</p>
                  </div>';
        }

    } else {
        $errorOccurred = true;
        echo '<div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Erreur</h4>
                <p>Erreur : Cette page attend une requête POST avec un jeton d\'accès.</p>
                <hr>
                <p class="mb-0">Erreur Handler by Antoine</p>
              </div>';
    }

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
                    <h4><strong>Email : </strong><?php echo $mail; ?></h4>
                    <h4><strong>Bio : </strong><?php echo $bio; ?></h4>
                    <h4><strong><?php echo $followers; ?></strong> followers</h4>
                    <h4><strong><?php echo $following; ?></strong> following</h4>
                </div>
                <div class="card-body">
                    <a href="<?php echo $url; ?>" class="card-link" target="_blank">Voir mon profil GitHub</a>
                </div>
                <?php if ($peutCliquer): ?>
                <a href="https://cloud.thmsczn.ovh/admin.php">
                    <button>Administrateur</button>
                </a>
                <?php else: ?>
                <form action="requestAccess.php" method="post">
                    <input type="hidden" name="user_id" value="<?php echo $id; ?>">
                    <button type="submit" class="disabled">Demander les droits administrateurs</button>
                </form>
                <?php endif; ?>
            </div>
                </div>

    <div class="column2">
        <div class="line1">
            <h1>Alertes</h1>
            <h3>Aucune alerte</h3>
        </div>
        <div class="line2">
            <?php if ($peutCliquer): ?>
                <button id="btn1" class="responsive-button" onclick="deploy()">
                    <ion-icon name="play-outline"></ion-icon>
                    <span>Création du déploiement</span>
                </button>
            <?php else: ?>
                <button class="responsive-button" disabled>
                    <ion-icon name="hand-right-outline" style="color: red;"></ion-icon>
                    <span>Création du déploiement</span>
                </button>
            <?php endif; ?>

            <?php if ($peutCliquer): ?>
                <button id="btn2" class="responsive-button" onclick="verifyCode()" disabled>
                    <ion-icon name="close-outline" style="color: red;"></ion-icon>
                    <span>Vérification du code</span>
                </button>
            <?php else: ?>
                <button class="responsive-button" disabled>
                    <ion-icon name="hand-right-outline" style="color: red;"></ion-icon>
                    <span>Vérification du code</span>
                </button>
            <?php endif; ?>

            <?php if ($peutCliquer): ?>
                <button id="btn3" class="responsive-button" onclick="checkSecurity()" disabled>
                    <ion-icon name="close-outline" style="color: red;"></ion-icon>
                    <span>Vérification de la sécurité</span>
                </button>
            <?php else: ?>
                <button class="responsive-button" disabled>
                    <ion-icon name="hand-right-outline" style="color: red;"></ion-icon>
                    <span>Vérification de la sécurité</span>
                </button>
            <?php endif; ?>

            <?php if ($peutCliquer): ?>
                <button id="btn4" class="responsive-button" onclick="finalizeDeployment()" disabled>
                    <ion-icon name="close-outline" style="color: red;"></ion-icon>
                    <span>Prêt pour le déploiement</span>
                </button>
            <?php else: ?>
                <button class="responsive-button" disabled>
                    <ion-icon name="hand-right-outline" style="color: red;"></ion-icon>
                    <span>Prêt pour le déploiement</span>
                </button>
            <?php endif; ?>
        </div>
        <div class="line3">
            <h1>Console</h1>
            <div id="consoleOutput"></div>
        </div>
    </div>
</div>

<?php } ?>
<script src="./js/api.js"></script>
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script>
        function getCurrentTimestamp() {
            const now = new Date();
            return now.toLocaleTimeString();
        }

        function deploy() {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'http://ec2-3-254-167-51.eu-west-1.compute.amazonaws.com:9000/create';
            
            fetch(proxyUrl + targetUrl, {
                headers: {
                    'Origin': 'null', 
                    'X-Requested-With': 'test',
                    'Content-Type':'application/x-www-form-urlencoded',
                },
            }).then(response => response.text())
            .then(data => {
                const timestamp = getCurrentTimestamp();

                console.log(timestamp + ' - ' + data);

                document.getElementById('consoleOutput').textContent += timestamp + ' - ' + data + '\n';

                updateButtonStatus('btn1', 'Déploiement créé');
                activateNextButton('btn2', 'Vérification du code');
            })
            .catch(error => {
                const timestamp = getCurrentTimestamp();

                console.error(timestamp + ' - Erreur lors de la requête:', error);
                document.getElementById('consoleOutput').textContent += timestamp + ' - Erreur: ' + error + '\n';
            });
        }

        function verifyCode() {

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'http://ec2-3-254-167-51.eu-west-1.compute.amazonaws.com:9000/verify';
            
            fetch(proxyUrl + targetUrl, {
                headers: {
                    'Origin': 'null', 
                    'X-Requested-With': 'test',
                    'Content-Type':'application/x-www-form-urlencoded',
                },
            }).then(response => response.text())
            .then(data => {
                const timestamp = getCurrentTimestamp();

                console.log(timestamp + ' - ' + data);

                document.getElementById('consoleOutput').textContent += timestamp + ' - ' + data + '\n';

                updateButtonStatus('btn2', 'Code vérifié');
                activateNextButton('btn3', 'Vérification de la sécurité');
            })
            .catch(error => {
                const timestamp = getCurrentTimestamp();

                console.error(timestamp + ' - Erreur lors de la requête:', error);
                document.getElementById('consoleOutput').textContent += timestamp + ' - Erreur: ' + error + '\n';
            });
        }

        function checkSecurity() {

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'http://ec2-3-254-167-51.eu-west-1.compute.amazonaws.com:9000/pentest';
            
            fetch(proxyUrl + targetUrl, {
                headers: {
                    'Origin': 'null', 
                    'X-Requested-With': 'test',
                    'Content-Type':'application/x-www-form-urlencoded',
                },
            }).then(response => response.text())
            .then(data => {
                const timestamp = getCurrentTimestamp();

                console.log(timestamp + ' - ' + data);

                document.getElementById('consoleOutput').textContent += timestamp + ' - ' + data + '\n';

                updateButtonStatus('btn3', 'Sécurité confirmée');
                activateNextButton('btn4', 'Déploiement terminé');
            })
            .catch(error => {
                const timestamp = getCurrentTimestamp();

                console.error(timestamp + ' - Erreur lors de la requête:', error);
                document.getElementById('consoleOutput').textContent += timestamp + ' - Erreur: ' + error + '\n';
            });
                       
        }

        function finalizeDeployment() {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'http://ec2-3-254-167-51.eu-west-1.compute.amazonaws.com:9000/deploy';
            
            fetch(proxyUrl + targetUrl, {
                headers: {
                    'Origin': 'null',
                    'X-Requested-With': 'test',
                    'Content-Type':'application/x-www-form-urlencoded',
                },
            }).then(response => response.text())
            .then(data => {
                const timestamp = getCurrentTimestamp();


                console.log(timestamp + ' - ' + data);

                document.getElementById('consoleOutput').textContent += timestamp + ' - ' + data + '\n';

                updateButtonStatus('btn4', 'Prêt pour le déploiement');
            })
            .catch(error => {
                const timestamp = getCurrentTimestamp();

                console.error(timestamp + ' - Erreur lors de la requête:', error);
                document.getElementById('consoleOutput').textContent += timestamp + ' - Erreur: ' + error + '\n';
            });
        }

        function activateNextButton(nextButtonId, newText) {
            var nextButton = document.getElementById(nextButtonId);
            if (nextButton) {
                nextButton.disabled = false;
                nextButton.innerHTML = '<ion-icon name="play-outline"></ion-icon><span>' + newText + '</span>';
            }
        }

        function updateButtonStatus(buttonId, newText) {
            var button = document.getElementById(buttonId);
            if (button) {
                button.innerHTML = '<ion-icon name="checkmark-outline" style="color: green;"></ion-icon><span>' + newText + '</span>';
            }
        }

</script>
 
</body>

</html>