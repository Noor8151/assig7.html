const apiKey = "f25d861563dde601ca4414b592c022da"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) return alert("Please enter a city.");

  // Construct the API URL for city-based search
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if the response contains weather data
    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    // Update the UI with the weather data
    document.getElementById("city-name").textContent = data.name;
    document.getElementById(
      "temperature"
    ).textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById(
      "description"
    ).textContent = `Description: ${data.weather[0].description}`;
    document.getElementById(
      "humidity"
    ).textContent = `Humidity: ${data.main.humidity}%`;

    // Show the weather info
    document.getElementById("weather-info").style.display = "block";
  } catch (error) {
    alert("Failed to fetch weather data.");
  }
}
