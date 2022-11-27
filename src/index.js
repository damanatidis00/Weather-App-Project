/*Date and Time Code */

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;

let currentTime = document.querySelector("#time");
if (currentMinutes < 10) {
  currentTime.innerHTML = `${currentHour}:0${currentMinutes}`;
} else {
  currentTime.innerHTML = `${currentHour}:${currentMinutes}`;
}

function formatDate(timestamp) {
  now = new Date(timestamp);
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let cityHour = now.getHours();
  let cityMinutes = now.getMinutes();

  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;

  let currentTime = document.querySelector("#time");
  if (cityMinutes < 10) {
    currentTime.innerHTML = `${cityHour}:0${cityMinutes}`;
  } else {
    currentTime.innerHTML = `${cityHour}:${cityMinutes}`;
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForcast(response) {
  let forecast = response.data.daily;
  let weatherCard = document.querySelector("#weather-card");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
    <div class="weathercard">
    <img src="${forecastDay.condition.icon_url}">
      <p>${formatDay(forecastDay.time)}</p>
     
      <p class="smalltext"> ${Math.round(
        forecastDay.temperature.maximum
      )}℃ / ${Math.round(forecastDay.temperature.minimum)}℃</p>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  weatherCard.innerHTML = forecastHTML;
}

/*Search City Weather Code / API Code */

function showCurrentWeather(response) {
  let timestamp = response.data.time * 1000;
  formatDate(timestamp);
  currentTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(currentTemperature);
  let windElement = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  windElement.innerHTML = "Wind " + Math.round(windSpeed) + "mph";
  let humidityElement = document.querySelector("#humidity");
  let currentHumidity = response.data.temperature.humidity;
  humidityElement.innerHTML = "Humidity " + currentHumidity;
  let descriptionElement = document.querySelector("#description");
  let currentDescription = response.data.condition.description;
  descriptionElement.innerHTML = currentDescription;
  let city = document.querySelector("#city");
  let searchedCity = response.data.city;
  city.innerHTML = searchedCity;
  let weatherIcon = document.querySelector("#weather-icon");
  let iconURL = response.data.condition.icon_url;
  weatherIcon.innerHTML = `<img src=${iconURL}>`;
}
let temperatureElement = document.querySelector("#temperature");
let currentTemperature = null;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form1");

  let key = "t3b440bad7o6b9c0b3f432b3e3d4d1d5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${key}`;
  let forcastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${searchInput.value}&key=${key}`;
  axios.get(apiUrl).then(showCurrentWeather);
  axios.get(forcastUrl).then(showForcast);
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", searchCity);

function getCoord(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "t3b440bad7o6b9c0b3f432b3e3d4d1d5";
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}`;
  let forcastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${key}`;
  axios.get(forcastUrl).then(showForcast);
  axios.get(apiURL).then(showCurrentWeather);
}

function openNavigator(event) {
  navigator.geolocation.getCurrentPosition(getCoord);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", openNavigator);

function search(city) {
  let key = "t3b440bad7o6b9c0b3f432b3e3d4d1d5";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
  axios.get(apiURL).then(showCurrentWeather);
}
