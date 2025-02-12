function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-app-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let wind = response.data.wind.speed;
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    temperatureElement.innerHTML = Math.round(temperature);
    windSpeedElement.innerHTML = `${Math.round(wind)}km/h`;
    timeElement.innerHTML = formatDate(date);
    
    getForecast(response.data.city);
    
}

function formatDate(date) {
    
    let minutes = date.getMinutes();

    if (minutes < 10) {
       minutes = `0${minutes}` 
    }

    let hours = date.getHours();

    if (hours < 10) {
        hours = `0${hours}`
    }

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    

    let day = days[date.getDay()];

    return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "e0ec6b874369tb90f96386aaf483o95a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
    

}

function getForecast(city) {
    let apiKey = "e0ec6b874369tb90f96386aaf483o95a";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);


    
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    
    let days = ['Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

    let forecastHtml = "";

    days.forEach(function(day) {
        forecastHtml = forecastHtml + `
        <div class="weather-forecast-day">
            <div class="weather-forecast-date">
                ${day}
            </div>
            <div class="weather-forecast-icon">
                🌥️
            </div>
            <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                    <strong>15°</strong> 
                </div>
                <div class="weather-forecast-temperature">
                    9°
                </div>
                        
            </div>
        </div>  

    `;

    forecastElement.innerHTML = forecastHtml;

    });

    

}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSubmit);

searchCity("Nairobi");

displayForecast();

