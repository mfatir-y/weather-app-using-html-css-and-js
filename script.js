var searchButton = document.querySelector('.searchButton');
var searchInput = document.querySelector('.searchValue');
var cityName = document.querySelector('.city-name');
var temperature = document.querySelector('.temperature');
var description = document.querySelector('.description');

function fetchWeatherData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchInput.value + '&appid=e9fdbec485cb1bb68cbd3557feb65d88&units=metric')
        .then(response => response.json())
        .then(data => {
            var nameValue = data['name'];
            var tempValue = data['main']['temp'];
            var descValue = data['weather'][0]['description'];

            cityName.innerHTML = nameValue;
            temperature.innerHTML = tempValue + ' °C';
            description.innerHTML = descValue;
        })
        .catch(e => alert("Please enter a valid city name."))
        .finally(() => {
            searchInput.value = '';
        });
}

searchButton.addEventListener('click', fetchWeatherData);

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchWeatherData();
    }
});