<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="https://cloud.thmsczn.ovh/images/logo_icon.jpg">
    <title>Redirection POST</title>
</head>

<body>

    <?php
    $clientId = '************';
    $clientSecret = '*************';
    $code = $_GET['code'];
    $userAgent = $_SERVER['HTTP_USER_AGENT'];

    $url = 'https://github.com/login/oauth/access_token';

    $data = array(
        'client_id' => $clientId,
        'client_secret' => $clientSecret,
        'code' => $code,
    );

    $options = array(
        'http' => array(
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data),
        ),
    );

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    // Parsez le résultat pour obtenir le jeton d'accès
    parse_str($result, $output);

    $accessToken = $output['access_token'];

    ?>
    
    <form id="postForm" action="home.php" method="post">
        <input type="hidden" name="access_token" value="<?php echo $accessToken; ?>">
    </form>

    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function () {
            // Soumission automatique du formulaire
            document.getElementById('postForm').submit();
        });
    </script>

</body>

</html>