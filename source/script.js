// Date feature
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

  let body = document.querySelector("body");
  let openSourceCodeElement = document.querySelector(".open-source-code");
  let developerNameElement = document.querySelector(".developer-name");
  if (currentHour < 7 || currentHour > 18) {
    body.classList.add("dark");
    body.classList.remove("light");
    openSourceCodeElement.classList.add("dark");
    openSourceCodeElement.classList.remove("light");
    developerNameElement.classList.add("dark");
    developerNameElement.classList.remove("light");
  } else {
    body.classList.add("light");
    body.classList.remove("dark");
    openSourceCodeElement.classList.add("light");
    openSourceCodeElement.classList.remove("dark");
    developerNameElement.classList.add("light");
    developerNameElement.classList.remove("dark");
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

let now = new Date();
displayCurrentDateAndTime(now);

// Search city weather feature
function displayWeather(response) {
  celsiusTemperature = Math.round(response.data.temperature.current);

  let currentTemperatureElement = document.querySelector(
    "span#current-temperature"
  );
  let currentTemperature = Math.round(response.data.temperature.current);
  currentTemperatureElement.innerHTML = currentTemperature;

  let currentHumidityElement = document.querySelector("span.current-humidity");
  let currentHumidity = Math.round(response.data.temperature.humidity);
  currentHumidityElement.innerHTML = currentHumidity;

  let currentWindElement = document.querySelector("span.current-wind");
  let currentWind = Math.round(response.data.wind.speed);
  currentWindElement.innerHTML = currentWind;

  let city = response.data.city;
  let country = response.data.country;

  let currentLocation = document.querySelector(".searched-location");
  currentLocation.innerHTML = `${city} in ${country}`;

  let currentWeatherIconElement = document.querySelector(
    ".current-weather-icon"
  );
  currentWeatherIconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  let exactWeatherDescription = response.data.condition.description;
  exactWeatherDescription =
    exactWeatherDescription.charAt(0).toUpperCase() +
    exactWeatherDescription.slice(1);
  currentWeatherIconElement.setAttribute("alt", exactWeatherDescription);
}

function showCityInput(event) {
  event.preventDefault();

  let searchInput = document.querySelector(".input-city");
  let currentLocation = document.querySelector(".searched-location");

  let apiKey = "o65149f37004a818054t1c639bd4becf";
  let temperatureUnits = "metric";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}&units=${temperatureUnits}`;

  if (searchInput.value) {
    currentLocation.innerHTML = searchInput.value;

    axios.get(weatherApiUrl).then(displayWeather);
  } else {
    alert("Please type in the city you would like to find");
  }
}

let searchInputForm = document.querySelector(".search-input-form");
searchInputForm.addEventListener("submit", showCityInput);

// Current weather at set location
function getDefaultWeather() {
  let city = "Bangkok";

  let apiKey = "o65149f37004a818054t1c639bd4becf";
  let temperatureUnits = "metric";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${temperatureUnits}`;

  axios.get(weatherApiUrl).then(displayWeather);
}

getDefaultWeather();

// Use current location feature
function getPosition(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;

  let temperatureUnits = "metric";
  let apiKey = "o65149f37004a818054t1c639bd4becf";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?lat=${currentLatitude}&lon=${currentLongitude}&key=${apiKey}&units=${temperatureUnits}`;

  axios.get(weatherApiUrl).then(displayWeather);
}

function useNavigator() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", useNavigator);

// Temperature conversion feature
function convertToCelsius(event) {
  event.preventDefault();

  let currentTemperatureElement = document.querySelector(
    "span#current-temperature"
  );

  unitConversionToCelsius.classList.add("active");
  unitConversionToFahrenheit.classList.remove("active");

  currentTemperatureElement.innerHTML = celsiusTemperature;
}

function convertToFahrenheit(event) {
  event.preventDefault();

  let currentTemperatureElement = document.querySelector(
    "span#current-temperature"
  );

  unitConversionToFahrenheit.classList.add("active");
  unitConversionToCelsius.classList.remove("active");

  currentTemperatureElement.innerHTML = Math.round(
    celsiusTemperature * (9 / 5) + 32
  );
}
let celsiusTemperature = null;

let unitConversionToCelsius = document.querySelector(".celsius-link");
let unitConversionToFahrenheit = document.querySelector(".fahrenheit-link");

unitConversionToCelsius.addEventListener("click", convertToCelsius);
unitConversionToFahrenheit.addEventListener("click", convertToFahrenheit);
