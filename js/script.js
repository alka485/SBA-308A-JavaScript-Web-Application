const apiKey =  "b9f6c58391da8f005bd41c6735238193";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
//console.log(locationInput);
const searchButton = document.getElementById('searchButton');
//console.log(searchButton);
const locationElement = document.getElementById('location');
//console.log(locationElement);
const temperatureElement = document.getElementById('temperature');
//console.log(temperatureElement);
const descriptionElement = document.getElementById('description');
//console.log(descriptionElement);

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
        descriptionElement.textContent = data.weather[0].description;
        
       })
       .catch(error => {
        console.error("Error fetching while weather data" , error);
       })
}