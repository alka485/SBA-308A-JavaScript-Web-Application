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

searchButton.addEventListener('click' , () => {
    //console.log("click");
    //console.log(searchBox.value);
   fetchWeather(searchBox.value);
})

 function fetchWeather(location){
       const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
       console.log(url);
       fetch(url) 
       .then(response => response.json())
       .then(data => {
        locationElement.innerHTML = data.name;
        //temperatureElement.innerHTML= `${Math.round(data.main.temp)}°C`;
        temperatureElement.innerText= `${Math.round(data.main.temp)}°C`;
        humidityElement.innerHTML = `${data.main.humidity}%`;
        windIcon.innerHTML = `${data.wind.speed}km/hr`;

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src= '../images/images/clouds.png';
        } else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "../images/images/clear.png";
          }
            else if(data.weather[0].main == "Rain"){  
                weatherIcon.src = "../images/images/rain.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                    weatherIcon.src = "../images/images/drizzle.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "../images/images/mist.png";
            }
            document.querySelector(".weatherinfo").style.display = "block";
            localStorage.setItem("location" , data.name);
        
       })

       .catch(error => {
        console.error("Error fetching while weather data" , error);
       })
}