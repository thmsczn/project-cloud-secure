<?php 

function navigation(){
echo'
    <header class="header">
    <nav class="navbar">
        <a href="https://cloud.thmsczn.ovh/home.php">Home</a>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="https://cloud.thmsczn.ovh/">Logout</a>
    </nav>
    <div class="weather-container">
        <div id="btcPrice"></div>
        <img id="weather-icon" alt="Weather Icon">
        <div id="weather"></div>
    </div>
    </header>';
}

?>