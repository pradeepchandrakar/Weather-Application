

# Weather Application

A dynamic weather application built using **HTML**, **CSS**, and **JavaScript**. This app allows users to check the current weather conditions and a 5-day weather forecast for any city, and it also provides the option to use the user's **current location** for weather updates. Additionally, it stores the last 5 recent city searches for quick access.

## Features

- **Search by City Name**: Enter a city name to get the current weather and a 5-day forecast.
- **Current Location**: Automatically fetch the weather based on your current geographical location.
- **Recent Searches**: A dropdown list showing your 5 most recent city searches, stored locally for easy access.
- **Weather Details**: Displays comprehensive information including temperature, wind speed, weather condition, and humidity.
- **5-Day Forecast**: Shows a detailed 5-day weather forecast with temperatures, wind speed, humidity, and weather conditions.



## Technologies Used

- **HTML5**: Markup language for creating the structure of the app.
- **CSS3**: Styling the app with responsive and modern design using **TailwindCSS**.
- **JavaScript**: Fetches weather data and dynamically updates the UI.
- **OpenWeatherMap API**: Used for fetching real-time weather data and 5-day forecasts.
- **Local Storage**: Stores recent city searches so users can easily access their past searches.

## Installation & Setup

Follow these steps to get the app running on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pradeepchandrakar/Weather-Application
   ```
   
2. **Navigate into the project folder**:
   ```bash
   cd weather-app
   ```

3. **Open the `index.html` file in your browser**.

   This will launch the weather app, and you can start searching for weather information.

## How It Works

### City Search

- Type the name of a city into the input field and click the **Search** button.
- The app validates the input (requires at least 3 characters).
- The app then makes a request to the OpenWeatherMap API to fetch the current weather and 5-day forecast for that city.
- Weather information, including the current temperature, wind speed, humidity, and weather description, is displayed in the UI.

### Current Location

- If you prefer to get the weather for your current location, click on the **Use Current Location** button.
- The app will request your location through the browser’s geolocation API and fetch the weather data for your coordinates.
  
### Recent Searches

- Each time you search for a city, it is saved to your local storage.
- The app displays a dropdown list of your last 5 searched cities when you click on the input field.
- Clicking on any city from the list will automatically populate the search field and display weather data for that city.

### Error Handling

- If an invalid city is entered or the API fails to return data, the app will show an error message prompting you to try again.
- It also checks if the user's browser supports geolocation and handles cases where location access is denied or unavailable.

## API Integration

This app uses the **OpenWeatherMap API** to fetch weather data. You can sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api).

**API Endpoints Used:**

1. **Current Weather by City**:
   ```bash
   https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={apiKey}
   ```

2. **5-Day Forecast by City**:
   ```bash
   https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={apiKey}
   ```

3. **Current Weather by Geolocation**:
   ```bash
   https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={apiKey}
   ```

4. **5-Day Forecast by Geolocation**:
   ```bash
   https://api.openweathermap.org/data/2.5/forecast?lat={latitude}&lon={longitude}&appid={apiKey}
   ```

### Example API Call:
```javascript
const apiKey = 'your-api-key-here';
fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching weather data:', error));
```

## How to Contribute

If you’d like to contribute to this project, feel free to fork the repository and submit a pull request. Contributions are always welcome!

### Steps to Contribute:
1. Fork the repository to your own GitHub account.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add a feature'`).
4. Push your changes to your forked repository (`git push origin feature/your-feature-name`).
5. Create a pull request to merge your changes back into the main repository.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

This enhanced README provides a more thorough understanding of the project, its features, how it works, and how to set it up. It also encourages contributors to participate, which makes it more welcoming for collaboration.