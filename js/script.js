const apiKey =  "b9f6c58391da8f005bd41c6735238193";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const searchBox = document.querySelector(".search-box input");
//console.log(searchBox);
const locationInput = document.getElementById('locationInput');
//console.log(locationInput);
const searchButton = document.getElementById('searchButton');
//console.log(searchButton);
const locationElement = document.getElementById('location');
//console.log(locationElement);
const temperatureElement = document.getElementById('temp');
//console.log(temperatureElement);
const humidityElement = document.getElementById('humidity');
//console.log(humidityElement);
const windIcon = document.getElementById('wind');
//console.log(windIcon);
const weatherIcon = document.querySelector(".weather-icon");
//console.log(weatherIcon);
const currentLocationButton = document.getElementById('currentLocationButton');
//console.log(currentLocationButton);
const unitToggle = document.getElementById('unitToggle');
//console.log(unitToggle);

//search Button event listener
searchButton.addEventListener('click' , () => {
    //console.log("click");
    //console.log(searchBox.value);
   fetchWeather(searchBox.value);
})

//Current Location Button
currentLocationButton.addEventListener('click' , () => {
    //console.log("working");
    if(navigator.geolocation){
        //console.log("on");
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoordinates(lat, lon);
        
        }, error => {
            console.error("Error getting geolocation:" , error);
            alert("Unable to retrieve your location");
        });

    } else {
        alert("GeoLocation is not supported by the browser");

    }
});


//Toggle button event listener
unitToggle.addEventListener("change", () => {
    //console.log("change");
    if(locationElement.textContent){
        fetchWeather(locationElement.textContent);
    }
})



//fetch weather through search button
 function fetchWeather(location){
       const units = unitToggle.value;
       const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=${units}`;
       console.log(url);
       fetch(url) 
       .then(response => response.json())
       .then(data => updateWeatherInfo(data))
       .catch(error => {
        console.error("Error fetching while weather data" , error);
       })
}

//fetch weather through current location

async function fetchWeatherByCoordinates(lat, lon) {
    const units = unitToggle.value;
    const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    try{
        const response = await fetch (url);
        if(!response.ok) {
            throw new Error ('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        console.error("Error fetching weather data", error);
    }

}

function updateWeatherInfo(data) {
        locationElement.innerHTML = data.name;
        //temperatureElement.innerHTML= `${Math.round(data.main.temp)}°C`;
        temperatureElement.innerText= `${Math.round(data.main.temp)}${unitToggle.value === 'metric' ? '°C': '°F'}`;
        humidityElement.innerHTML = `${data.main.humidity}%`;
        windIcon.innerHTML = `${data.wind.speed}km/hr`;

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = '../images/images/clouds.png';
                break;
            case "Clear":
                weatherIcon.src = '../images/images/clear.png';
                break;
            case "Rain":
                weatherIcon.src = '../images/images/rain.png';
                break;
            case "Drizzle":
                weatherIcon.src = '../images/images/drizzle.png';
                break;
            case "Mist":
                weatherIcon.src = '../images/images/mist.png';
                break;
            default:
                weatherIcon.src = ''; // Provide a default or empty src
                break;
        }
    
        document.querySelector(".weatherinfo").style.display = "block";
        localStorage.setItem("location", data.name);

}

