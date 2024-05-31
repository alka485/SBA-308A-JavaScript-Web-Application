const apiKey =  "b9f6c58391da8f005bd41c6735238193";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
//console.log(locationInput);
const searchButton = document.getElementById('searchButton');
//console.log(searchButton);
const locationElement = document.getElementById('location');
//console.log(locationElement);
const temperatureElement = document.getElementById('temp');
//console.log(temperatureElement);
const humidityElement = document.getElementById('humidity');
//console.log(descriptionElement);
const windIcon = document.querySelector(".wind-icon");

searchButton.addEventListener('click' , () => {
    const location  = locationInput.value;
    //console.log(location);
    if (location) {
    //    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    //    console.log(url);
         fetchWeather(location);
    }
})

function fetchWeather(location){
       const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
       console.log(url);
       fetch(url) 
       .then(response => response.json())
       .then(data => {
        locationElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        humidityElement.textContent = data.main.humidity+"%";
        windIcon.textContent = data.wind.speed + "km/hr";
        
       })
       .catch(error => {
        console.error("Error fetching while weather data" , error);
       })
}