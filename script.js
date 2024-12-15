var searchButton = document.querySelector('.searchButton');
var searchInput = document.querySelector('.searchValue');
var cityName = document.querySelector('.city-name');
var temperature = document.querySelector('.temperature');
var description = document.querySelector('.description');
var resultsContainer = document.querySelector('.row');

function cityExists(city) {
    var cityHeaders = document.querySelectorAll('.city-name');
    return Array.from(cityHeaders).some(header => header.textContent.toLowerCase() === city.toLowerCase());
}

function createCityCard(name, temp, desc) {
    var col = document.createElement('div');
    col.className = 'col';
    
    var card = document.createElement('div');
    card.className = 'card h-100 text-center shadow rounded-3';

    var cardHeader = document.createElement('h4');
    cardHeader.className = 'card-header city-name';
    cardHeader.textContent = name;

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    var tempElement = document.createElement('p');
    tempElement.className = 'temperature card-text';
    tempElement.textContent = temp + ' °C';

    var descElement = document.createElement('p');
    descElement.className = 'description card-text text-capitalize';
    descElement.textContent = desc;

    cardBody.appendChild(tempElement);
    cardBody.appendChild(descElement);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    col.appendChild(card);

    resultsContainer.appendChild(col);
}

function fetchWeather() {
    var city = searchInput.value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    if (cityExists(city)) {
        alert("City already exists.");
        searchInput.value = '';
        return;
    }

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=e9fdbec485cb1bb68cbd3557feb65d88&units=metric')
        .then(response => response.json())
        .then(data => {
            var nameValue = data['name'];
            var tempValue = data['main']['temp'];
            var descValue = data['weather'][0]['description'];

            createCityCard(nameValue, tempValue, descValue);
        })
        .catch(e => alert("Please enter a valid city name."))
        .finally(() => {
            searchInput.value = '';
        });
}

searchButton.addEventListener('click', fetchWeather);

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});
