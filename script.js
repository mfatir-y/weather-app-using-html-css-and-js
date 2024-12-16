var searchButton = document.querySelector('.searchButton');
var searchInput = document.querySelector('.searchValue');
var cityName = document.querySelector('.city-name');
var temperature = document.querySelector('.temperature');
var description = document.querySelector('.description');
var citiesSearchedContainer = document.querySelector('.row');

function cityExists(city) {
    var cityHeaders = document.querySelectorAll('.city-name');
    return Array.from(cityHeaders).some(header => header.textContent.toLowerCase() === city.toLowerCase());
}

function createCityCard(data) {
    var col = document.createElement('div');
    col.className = 'col';
    
    var card = document.createElement('div');
    card.className = 'card text-white bg-dark h-100 text-center shadow rounded-3';

    var cityName = document.createElement('h4');
    cityName.className = 'city-name m-0';
    cityName.textContent = data['name'];
    var countryName = document.createElement('p');
    countryName.className = 'country-name m-0 fs-6 fw-light';
    countryName.textContent = data['sys']['country'];

    var nameGroup = document.createElement('div');
    nameGroup.className = 'text-start';
    nameGroup.appendChild(cityName);
    nameGroup.appendChild(countryName);

    var icon = document.createElement('img');
    icon.className = 'weather-icon';
    icon.src = 'https://openweathermap.org/img/wn/' + data['weather'][0]['icon'] + '.png';

    var cardHeader = document.createElement('div');
    cardHeader.className = 'card-header d-flex flex-direction-row justify-content-around align-items-center';
    cardHeader.appendChild(nameGroup);
    cardHeader.appendChild(icon);

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    var temperatureElement = document.createElement('p');
    temperatureElement.className = 'temperature card-text fw-bold';
    temperatureElement.textContent = data['main']['temp'] + ' °C';
    var feelsLikeElement = document.createElement('p');
    feelsLikeElement.className = 'feels-like card-text fst-italic';
    feelsLikeElement.textContent = 'Feels Like: ' + data['main']['feels_like'] + ' °C';

    var tempElements = document.createElement('div');
    tempElements.className = 'd-flex justify-content-around';
    tempElements.appendChild(temperatureElement);
    tempElements.appendChild(feelsLikeElement);

    var descElement = document.createElement('p');
    descElement.className = 'description card-text text-capitalize';
    descElement.textContent = data['weather'][0]['description'];

    cardBody.appendChild(tempElements);
    cardBody.appendChild(descElement);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    col.appendChild(card);

    citiesSearchedContainer.appendChild(col);
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
            createCityCard(data);
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
