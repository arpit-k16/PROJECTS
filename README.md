![image](https://github.com/user-attachments/assets/0f543e83-8ec8-4a7a-89a5-c477e48d93ea)
![image](https://github.com/user-attachments/assets/5e65a28f-2094-46f4-b61b-3be441c496ad)
![image](https://github.com/user-attachments/assets/96895ba8-874a-4f1f-b8de-384e55322d2e)
![image](https://github.com/user-attachments/assets/be559a26-b3e7-497b-8998-e9c783c761ff)
![Uploading image.png…]()



# Weatherly 🌦️

Weatherly is a simple weather forecast and rain alert web application. Users can enter a city name to get a 5-day weather forecast and check if rain is expected in that location.

## Features

- **Weather Forecast**: Provides a 5-day weather forecast for a specified city.
- **Rain Alert**: Notifies the user if rain is expected in the selected city, suggesting them to take an umbrella if needed.
- **Text-to-Speech Alerts**: Plays a verbal alert using text-to-speech functionality.

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **APIs**:
  - [OpenWeatherMap](https://openweathermap.org/) for weather data
  - [Nominatim (OpenStreetMap)](https://nominatim.org/) for geocoding

## Project Structure

```plaintext
├── static/
│   ├── images/               # Stores images like the background and icons
│   └── style.css             # Custom styles for the application
├── templates/
│   ├── home.html             # Home page template
│   ├── index.html            # Weather forecast page template
│   └── rain.html             # Rain alert page template
├── app.py                    # Main Flask application
└── README.md                 # Project documentation
```

## Setup and Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/weatherly.git
    cd weatherly
    ```

2. **Install Dependencies**:
    Make sure you have Python and pip installed. Install the required libraries:
    ```bash
    pip install flask requests pygame gTTS
    ```

3. **Set API Key**:
    Replace the `API_KEY` in `app.py` with your own OpenWeatherMap API key.

4. **Run the Application**:
    ```bash
    python app.py
    ```

5. **Access the App**:
    Open your browser and go to `http://127.0.0.1:5000`.

## Usage

1. **Weather Forecast**:
   - Enter a city name in the text box and click "Get Forecast" to view a 5-day forecast.
   
2. **Rain Alert**:
   - Enter the same city name and click "Check for Rain" to find out if rain is expected.

## Configuration

Ensure the following environment variable is set for your OpenWeatherMap API key:

```plaintext
OPENWEATHER_API_KEY='your_api_key_here'
```

You can update the CSS file (`style.css`) under `static/` for further styling customization.

### Home Page
![Home Page](path/to/homepage-screenshot.png)

### Weather Forecast
![Weather Forecast](path/to/forecast-screenshot.png)

### Rain Alert
![Rain Alert](path/to/rain-alert-screenshot.png)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
