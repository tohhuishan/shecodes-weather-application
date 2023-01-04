// Date feature
let now = new Date();

function displayCurrentDateAndTime(dateAndTimeNow) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  let currentDay = days[dateAndTimeNow.getDay()];

  let currentDateNumber = dateAndTimeNow.getDate();
  if (currentDateNumber < 10) {
    currentDateNumber = "0" + currentDateNumber;
  }

  let currentMonth = months[dateAndTimeNow.getMonth()];

  let currentYear = dateAndTimeNow.getFullYear();

  let currentHour = dateAndTimeNow.getHours();
  if (currentHour < 10) {
    currentHour = "0" + currentHour;
  }

  let currentMinute = dateAndTimeNow.getMinutes();
  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  }

  let dayNow = document.querySelector(".current-day");
  let dateNumberNow = document.querySelector(".current-date-number");
  let monthNow = document.querySelector(".current-month");
  let yearNow = document.querySelector(".current-year");
  let hourNow = document.querySelector(".current-hour");
  let minuteNow = document.querySelector(".current-minute");

  dayNow.innerHTML = currentDay;
  dateNumberNow.innerHTML = currentDateNumber;
  monthNow.innerHTML = currentMonth;
  yearNow.innerHTML = currentYear;
  hourNow.innerHTML = currentHour;
  minuteNow.innerHTML = currentMinute;
}

displayCurrentDateAndTime(now);

// Search city weather feature
function displayWeather(response) {
  let currentTemperatureElement = document.querySelector(
    "span#current-temperature"
  );
  let currentTemperature = Math.round(response.data.main.temp);
  currentTemperatureElement.innerHTML = currentTemperature;

  let currentHumidityElement = document.querySelector("span.current-humidity");
  let currentHumidity = Math.round(response.data.main.humidity);
  currentHumidityElement.innerHTML = currentHumidity;

  let currentWindElement = document.querySelector("span.current-wind");
  let currentWind = Math.round(response.data.wind.speed);
  currentWindElement.innerHTML = currentWind;

  let city = response.data.name;
  let country = response.data.sys.country;

  let currentLocation = document.querySelector(".searched-location");
  currentLocation.innerHTML = `${city} in ${country}`;
}

function showCityInput(event) {
  event.preventDefault();

  let searchInput = document.querySelector(".input-city");
  let currentLocation = document.querySelector(".searched-location");

  let apiKey = "017d56650cd168d68067850318775d43";
  let temperatureUnits = "metric";
  let firstWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${temperatureUnits}`;

  if (searchInput.value) {
    currentLocation.innerHTML = searchInput.value;

    axios.get(firstWeatherApiUrl).then(displayWeather);
  } else {
    alert("Please type in the city you would like to find");
  }
}

let searchInputForm = document.querySelector(".search-input-form");
searchInputForm.addEventListener("submit", showCityInput);

// Current weather at set location
function getDefaultWeather() {
  let cityMoscow = "moscow";

  let apiKey = "017d56650cd168d68067850318775d43";
  let temperatureUnits = "metric";
  let firstWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityMoscow}&appid=${apiKey}&units=${temperatureUnits}`;

  axios.get(firstWeatherApiUrl).then(displayWeather);
}

getDefaultWeather();

// Temperature conversion feature
// let unitConversionToCelsius = document.querySelector(".celsius-link");
// let unitConversionToFahrenheit = document.querySelector(".fahrenheit-link");

// function convertToCelsius(changeUnits) {
//   changeUnits.preventDefault();

//   let currentTemperatureElement = document.querySelector(
//     "span#current-temperature"
//   );

//   if (currentTemperatureElement.classList.contains("celsius")) {
//     return;
//   } else {
//     currentTemperatureElement.classList.add("celsius");
//     currentTemperatureElement.classList.remove("fahrenheit");
//   }

//   let currentTemperature = currentTemperatureElement.innerHTML;
//   currentTemperature = Number(currentTemperature);

//   let currentTemperatureInCelsius = document.querySelector("span.celsius");
//   currentTemperatureInCelsius.innerHTML = Math.round(
//     ((currentTemperature - 32) * 5) / 9
//   );
// }

// function convertToFahrenheit(changeUnits) {
//   changeUnits.preventDefault();

//   let currentTemperatureElement = document.querySelector(
//     "span#current-temperature"
//   );

//   if (currentTemperatureElement.classList.contains("fahrenheit")) {
//     return;
//   } else {
//     currentTemperatureElement.classList.add("fahrenheit");
//     currentTemperatureElement.classList.remove("celsius");
//   }

//   let currentTemperatureInFahrenheit =
//     document.querySelector("span.fahrenheit");

//   let currentTemperature = currentTemperatureElement.innerHTML;
//   currentTemperature = Number(currentTemperature);

//   currentTemperatureInFahrenheit.innerHTML = Math.round(
//     currentTemperature * (9 / 5) + 32
//   );
// }

// unitConversionToCelsius.addEventListener("click", convertToCelsius);
// unitConversionToFahrenheit.addEventListener("click", convertToFahrenheit);

// Use current location feature
let currentLocationButton = document.querySelector(".current-location-button");

function getPosition(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;

  let temperatureUnits = "metric";
  let apiKey = "017d56650cd168d68067850318775d43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=${temperatureUnits}`;

  axios.get(apiUrl).then(displayWeather);
}

function useNavigator() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

currentLocationButton.addEventListener("click", useNavigator);
