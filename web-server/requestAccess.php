<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['github_id'])) {
    $githubId = intval($_POST['github_id']);

    // Envoi d'un e-mail pour la demande d'accès
    $to = 'cloud@thmsczn.ovh';
    $subject = 'Demande d\'accès';
    $message = "Un utilisateur demande l'accès. ID GitHub: " . $githubId;
    $headers = 'From: cloud@thmsczn.com' . "\r\n" .
               'Reply-To: cloud@thmsczn.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);

    echo "Demande d'accès envoyée.";
}
?>
