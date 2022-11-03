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

/*Search City Weather Code / API Code */

function showCurrentWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let currentTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(currentTemperature) + "℉";
  let windElement = document.querySelector("#wind");
  windSpeed = response.data.wind.speed;
  windElement.innerHTML = "Wind " + Math.round(windSpeed) + "mph";
  let humidityElement = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  humidityElement.innerHTML = "Humidity " + currentHumidity;
  let descriptionElement = document.querySelector("#description");
  let currentDescription = response.data.weather[0].main;
  descriptionElement.innerHTML = currentDescription;
  let city = document.querySelector("#city");
  let searchedCity = response.data.name;
  city.innerHTML = searchedCity;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form1");

  let key = "2718952144ed077c12e7c160fb6fc351";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${key}&units=imperial`;
  axios.get(apiUrl).then(showCurrentWeather);
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", searchCity);

function getCoord(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "2718952144ed077c12e7c160fb6fc351";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
  axios.get(apiURL).then(showCurrentWeather);
}

function openNavigator() {
  navigator.geolocation.getCurrentPosition(getCoord);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", openNavigator);

/* trying to change the temperature to celcius, having a hard time
seems like I have to turn the string into an integer to get the
equation to work but I can't figure out how, I keep getting NaN 

let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", changeToCelcius);

function changeToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celciusTemp = temperatureElement.innerHTML;
  celciusTemp = Number(celciusTemp);
  temperatureElement.innerHTML = Math.round((celciusTemp - 32) * 5) / 9;
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = "68";
}

let FahrenheitButton = document.querySelector("f-button");
FahrenheitButton.addEventListener("click", changeToFahrenheit);*/
