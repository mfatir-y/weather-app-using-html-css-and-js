var searchButton = document.querySelector('.searchButton');
var searchInput = document.querySelector('.searchValue');

searchButton.addEventListener('click', function() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchInput.value+'&appid=e9fdbec485cb1bb68cbd3557feb65d88')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        alert("Please enter a valid city name");
    });
});