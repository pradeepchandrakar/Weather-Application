// Get references to necessary DOM elements
const city = document.querySelector("input");  // Input field for city name
const searchButton = document.querySelector(".search");  // Search button for fetching weather data
const currentLocationButton = document.querySelector(".curentLocation");  // Button to use current location
const recentSearchesContainer = document.createElement('div');  // Container to display recent searches
recentSearchesContainer.className = 'recent-searches';  // Assign class for styling
document.body.appendChild(recentSearchesContainer);  // Append the recent searches container to the body

// Default city value
city.value = "Bilaspur";

// Load recent searches from local storage, if available
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// Show recent searches when the input field is clicked
city.addEventListener("click", () => {
  showRecentSearches();  // Display the recent searches
});

// Function to display recent searches in a dropdown
function showRecentSearches() {
  recentSearchesContainer.innerHTML = '';  // Clear previous content
  recentSearchesContainer.style.display = 'block';  // Show the recent searches container
  recentSearches.forEach(search => {
    const searchItem = document.createElement('div');  // Create a new search item
    searchItem.className = 'search-item';  // Assign class for styling
    searchItem.innerText = search;  // Set the search text
    searchItem.addEventListener('click', () => {  // Add event listener to handle click on recent search
      city.value = search;  // Set city input to the clicked search
      getWeatherByCity(search);  // Fetch weather for the selected city
      get5DayForecastByCity(search);  // Fetch 5-day forecast for the selected city
      recentSearchesContainer.style.display = 'none';  // Hide the recent searches container
    });
    recentSearchesContainer.appendChild(searchItem);  // Append the search item to the container
  });
}

// Hide the recent searches dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!city.contains(e.target) && !recentSearchesContainer.contains(e.target)) {
    recentSearchesContainer.style.display = 'none';  // Hide the dropdown if clicked outside
  }
});

// Update local storage with the new city search
function updateRecentSearches(cityName) {
  if (cityName && !recentSearches.includes(cityName)) {  // Only add if the city is not already in the list
    recentSearches.unshift(cityName);  // Add the city to the beginning of the array
    if (recentSearches.length > 5) recentSearches.pop();  // Limit to 5 recent searches
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));  // Save to local storage
  }
}

// Search button event listener to fetch weather for the entered city
searchButton.addEventListener("click", () => {
  const cityName = city.value;  // Get the value entered by the user

  // Validate city input
  if (!cityName || cityName.trim().length < 3) {
    alert("Please enter a valid city name.");  // Alert if the input is too short
    return;
  }

  // Fetch weather and forecast data for the city
  getWeatherByCity(cityName);
  get5DayForecastByCity(cityName);
  
  // Update recent searches and clear input field
  updateRecentSearches(cityName);
  city.value = "";
});

// Event listener for the "Use Current Location" button to fetch weather based on user's geolocation
currentLocationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    // Get the current position (latitude and longitude)
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;  // Extract latitude and longitude
      getWeatherByCoords(latitude, longitude);  // Fetch weather based on coordinates
      get5DayForecastByCoords(latitude, longitude);  // Fetch 5-day forecast based on coordinates
    }, (error) => {
      console.error("Error getting location", error);  // Log error if location retrieval fails
      alert("Unable to retrieve location. Please allow location access.");  // Alert the user
    });
  } else {
    alert("Geolocation is not supported by this browser.");  // Alert if geolocation is not supported
  }
});

// Fetch current weather based on city name
function getWeatherByCity(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6bdde07b0fa64a31b4cb462754f003be`)  // API call for current weather
    .then(response => {
      if (!response.ok) {  // Handle non-OK responses
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();  // Parse JSON response
    })
    .then(data => {
      if (data.cod !== 200) {  // Handle case if city is not found
        alert("City not found. Please try again with a valid city.");
        return;
      }
      updateCurrentWeather(data);  // Update the weather data on the UI
    })
    .catch(error => {
      console.error('Error fetching current weather:', error);  // Log error if the fetch fails
      alert("Failed to retrieve weather data. Please try again later.");
    });
}

// Fetch current weather based on coordinates (latitude and longitude)
function getWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6bdde07b0fa64a31b4cb462754f003be`)  // API call using coordinates
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();  // Parse JSON response
    })
    .then(updateCurrentWeather)  // Update weather data on success
    .catch(error => {
      console.error('Error fetching current weather by coordinates:', error);  // Log error if the fetch fails
      alert("Failed to retrieve weather data. Please try again later.");
    });
}

// Fetch 5-day weather forecast based on city name
function get5DayForecastByCity(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=6bdde07b0fa64a31b4cb462754f003be`)  // API call for 5-day forecast
    .then(response => {
      if (!response.ok) {  // Handle non-OK responses
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();  // Parse JSON response
    })
    .then(data => {
      if (data.cod !== "200") {  // Handle case if city is not found
        alert("City not found. Please try again with a valid city.");
        return;
      }
      update5DayForecast(data);  // Update 5-day forecast data on the UI
    })
    .catch(error => {
      console.error('Error fetching 5-day forecast:', error);  // Log error if the fetch fails
      alert("Failed to retrieve forecast data. Please try again later.");
    });
}

// Fetch 5-day forecast based on coordinates
function get5DayForecastByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6bdde07b0fa64a31b4cb462754f003be`)  // API call using coordinates
    .then(response => {
      if (!response.ok) {  // Handle non-OK responses
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();  // Parse JSON response
    })
    .then(update5DayForecast)  // Update 5-day forecast on success
    .catch(error => {
      console.error('Error fetching 5-day forecast by coordinates:', error);  // Log error if the fetch fails
      alert("Failed to retrieve forecast data. Please try again later.");
    });
}

// Update current weather information on the UI
function updateCurrentWeather(data) {
  document.getElementById("cityNames").innerText = `${data.name}`;  // Display the city name
  document.getElementById("dynamic-image").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;  // Set the weather icon
  document.getElementById("sky").innerText = `${data.weather[0].description}`;  // Display weather description
  document.getElementById("weather-data").innerHTML = `  <!-- Display temperature, wind speed, humidity, and condition -->
    <p>Temperature: ${Math.round(data.main.temp - 273.15)} °C</p>
    <p>Wind Speed: ${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
    <p>Condition: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
}

// Update 5-day forecast data on the UI
function update5DayForecast(data) {
  for (let i = 0; i < 5; i++) {
    const forecast = data.list[i * 8];  // Use data at 8-hour intervals
    if (forecast) {
      updateForecastElement(i + 1, forecast);  // Update forecast element for each day
    }
  }
}

// Update individual forecast elements with the forecast data
function updateForecastElement(index, forecast) {
  const date = new Date(forecast.dt_txt).toLocaleDateString();  // Format the date
  document.querySelector(`.date${index}`).innerText = date;  // Set the date on the UI
  document.querySelector(`.icon${index}`).src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;  // Set the weather icon
  document.querySelector(`.discription${index}`).innerText = forecast.weather[0].description;  // Set weather description
  document.querySelector(`.temp${index}`).innerText = `Temperature: ${(forecast.main.temp - 273.15).toFixed(1)} °C`;  // Set the temperature
  document.querySelector(`.wind${index}`).innerText = `Wind Speed: ${(forecast.wind.speed * 3.6).toFixed(1)} km/h`;  // Set wind speed
  document.querySelector(`.Humidity${index}`).innerText = `Humidity: ${forecast.main.humidity}%`;  // Set humidity
}
