window.onload = function() {
    const apiKey = '6631b6231eb5a2557aa7a93333e25810'; // Remplacez par votre clé API d'OpenWeatherMap
    const ville = 'Lille';
    const urlweather = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;
    const urlbitcoin = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

    fetch(urlweather)
        .then(response => response.json())
        .then(data => {
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
            document.getElementById('weather-icon').src = iconUrl;
            const tempRounded = Math.round(data.main.temp);
            const weather = `<p>${tempRounded}°C</p>`;
            document.getElementById('weather').innerHTML = weather;
        })
        .catch(error => {
            document.getElementById('weather').innerHTML = "Impossible de récupérer les données météo.";
        });

    fetch(urlbitcoin)
        .then(response => response.json())
        .then(data => {
            const btcValue = data.bitcoin.usd;
            document.getElementById('btcPrice').innerHTML = `1 BTC = $${btcValue}`;
        })
        .catch(error => {
            document.getElementById('btcPrice').innerHTML = "Impossible de récupérer la valeur du Bitcoin.";
        });
};
