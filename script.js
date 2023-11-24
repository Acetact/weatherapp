document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "b7d203109f891aa4bcfba4e3843d8092";

  const weatherContainer = document.getElementById("weather-container");
  const locationNameElement = document.getElementById("location-name");
  const temperatureElement = document.getElementById("temperature");
  const weatherDescriptionElement = document.getElementById(
    "weather-description"
  );

  // Function to get weather by coordinates
  function getWeatherByCoords(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        displayWeather(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        weatherContainer.innerHTML = "<p>Error fetching weather data</p>";
      });
  }

  // Get user's geolocation and fetch weather data
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        weatherContainer.innerHTML = "<p>Error getting geolocation</p>";
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    weatherContainer.innerHTML = "<p>Geolocation is not supported</p>";
  }

  // Function to display weather data
  function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;

    locationNameElement.textContent = cityName;
    temperatureElement.textContent = `Temperature: ${temperature} °C`;
    weatherDescriptionElement.textContent = `Weather: ${weatherDescription}`;
  }
});
