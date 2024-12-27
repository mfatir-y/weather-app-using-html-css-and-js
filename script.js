const API_KEY = 'e9fdbec485cb1bb68cbd3557feb65d88';
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
    card.className = 'card text-black h-100 text-center shadow rounded-3';

    var cardHeader = document.createElement('div');
    cardHeader.className = 'card-header pb-0 d-flex flex-direction-row justify-content-around align-items-center';

    var nameGroup = document.createElement('div');
    nameGroup.className = 'text-start';
    var cityName = document.createElement('h4');
    cityName.className = 'city-name m-0';
    cityName.textContent = data['name'];
    nameGroup.appendChild(cityName);
    var countryName = document.createElement('p');
    countryName.className = 'country-name m-0 fs-6 fw-light';
    countryName.textContent = data['sys']['country'];
    nameGroup.appendChild(countryName);
    cardHeader.appendChild(nameGroup);
    var weatherIcon = document.createElement('img');
    weatherIcon.className = 'weather-icon';
    weatherIcon.src = 'https://openweathermap.org/img/wn/' + data['weather'][0]['icon'] + '.png';
    cardHeader.appendChild(weatherIcon);

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body pt-1';

    var descElement = document.createElement('p');
    descElement.className = 'description card-text text-capitalize fw-bold';
    descElement.textContent = data['weather'][0]['description'];
    cardBody.appendChild(descElement);

    var tempElements = document.createElement('div');
    tempElements.className = 'd-flex justify-content-around';
    var temperatureElement = document.createElement('p');
    temperatureElement.className = 'temperature card-text fw-bold';
    temperatureElement.textContent = `${data['main']['temp']} °C`;
    tempElements.appendChild(temperatureElement);
    var feelsLikeElement = document.createElement('p');
    feelsLikeElement.className = 'feels-like card-text fst-italic';
    feelsLikeElement.textContent = `Feels Like: ${data['main']['feels_like']} °C`;
    tempElements.appendChild(feelsLikeElement);
    cardBody.appendChild(tempElements);
    
    var daylightDuration = data.sys.sunset - data.sys.sunrise;
    var daylightHours = Math.floor(daylightDuration / 3600);
    var daylightMinutes = Math.floor((daylightDuration % 3600) / 60);
    
    var daylightElement = document.createElement('p');
    daylightElement.className = 'daylight card-text';
    daylightElement.textContent = `Daylight Duration: ${daylightHours} hrs ${daylightMinutes} mins`;
    cardBody.appendChild(daylightElement);

    var windElement = document.createElement('p');
    windElement.className = 'wind card-text';
    windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    cardBody.appendChild(windElement);

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

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY +'&units=metric')
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


function clearBoard() {
    citiesSearchedContainer.innerHTML = '';
    console.log("Board has been cleared.");
}

var clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', function () {
    clearBoard(); 
});

fetch('cities_list.json')
    .then(response => response.json())
    .then(data => {
        citiesList = data;
        console.log("City list successully loaded")
    })
    .catch(error => console.error('Error loading the city list')
);

function fetchWeatherForCity(cityName) {
    console.log("Fetching city")
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(response => {
            console.log("City fetched")
            return response.json();
        })
        .then(data => createCityCard(data))
        .catch(e => {
            console.error(`Error fetching weather for ${cityName}:`, e);
        });
}

var randomizeButton = document.querySelector('.randomize');
randomizeButton.addEventListener('click', () => {
    console.log("Randomize button pressed");
    clearBoard();
    const shuffledCities = citiesList.sort(() => 0.5 - Math.random()).slice(0, 8);
    shuffledCities.forEach(city => {
        fetchWeatherForCity(city.City);
    });
});