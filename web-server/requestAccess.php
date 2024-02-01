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
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['user_id'])) {
            $userId = $_POST['user_id'];

            $to = 'cloud@thmsczn.ovh';
            $subject = 'Nouvelle demande pour des droits administrateurs';
            $texte_html  = '<html><body>';
            $texte_html .= '<div style="background-color:#050a30;padding:20px;text-align:center;">';
            $texte_html .= "<img src='https://cloud.thmsczn.ovh/images/logo_icon.png' width='200'>";
            $texte_html .= "<div style='background-color: #ffffff;padding:20px;text-align:center;color:#050a30;'><h1>Demande d'acc&egrave;s &agrave; valider</h1>";
            $texte_html .= "</div></div>";
            $texte_html .= '<div style="background-color:#ffffff;padding:20px;text-align:left;color:#050a30;">';
            $texte_html .= '<br><p>Cliquez sur ce lien pour approuver : </p>';
            $texte_html .= 'https://cloud.thmsczn.ovh/approve.php?user_id=' . $userId;
            $texte_html .= "</body></html>";

            $mime_boundary = "----nomdusite----".md5(time());
            $entetes = "From: Cloud Secure <no-reply@cloud.thmsczn.ovh>\n";
            $entetes .= "Mime-Version: 1.0\n";
            $entetes .= "Content-Type: multipart/alternative; boundary=\"$mime_boundary\"\n";
            $entetes .= "X-Sender: <www.cloud.thmsczn.ovh>\n";
            $entetes .= "X-Mailer: PHP/" . phpversion() . " \n" ;
            $entetes .= "X-Priority: 3 (normal) \n";
            $entetes .= "X-auth-smtp-user: $email\n";
            $entetes .= "X-abuse-contact: ontact@thmsczn.ovh\n";
            $entetes .= "Importance: Normal\n";
            $entetes .= "Reply-to: contact@thmsczn.ovh\n";
            
            $mess = "--$mime_boundary\n";
            $mess .= "Content-Type: text/html; charset=ISO-8859-1\n";
            $mess .= "Content-Transfer-Encoding: 8bit\n\n";
            $mess .= $texte_html;   
            
            mail($to, $subject, $mess, $entetes);

            echo '
            <div class="container">
                <div class="column1">
                    <div class="card">
                        <h4>Votre demande a été envoyée.</h4>
                    </div>
                </div>
            </div>';
        }
        ?>
    </body>
</html>
