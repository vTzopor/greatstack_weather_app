const apiKey = "cd1135100d4b74823d6a0de9ec89f03c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error-message").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  } else {
    var data = await response.json();

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + " °c";
    document.querySelector(".humidity").innerText = data.main.humidity + " %";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "/weather-app-img/images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "/weather-app-img/images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "/weather-app-img/images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "/weather-app-img/images/drizzle.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error-message").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

