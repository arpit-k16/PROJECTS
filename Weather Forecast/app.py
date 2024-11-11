from flask import Flask, request, jsonify, render_template
import requests
import os
import pygame
from gtts import gTTS

app = Flask(__name__)

# OpenWeatherMap API Key
API_KEY = os.getenv('OPENWEATHER_API_KEY', 'dda94a895d41c6d7d050731ac0d7a4d6')

# Function to play spoken text
def speak_text(text):
    tts = gTTS(text=text, lang='en', slow=False)
    tts.save("output.mp3")
    pygame.mixer.init()
    pygame.mixer.music.load("output.mp3")
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(10)

# Get latitude and longitude for a given place name
def get_coordinates(place):
    url = f"https://nominatim.openstreetmap.org/search?q={place}&format=json"
    headers = {"User-Agent": "my-weather-app/1.0"}
    response = requests.get(url, headers=headers)
    data = response.json()
    if data:
        return data[0]["lat"], data[0]["lon"]
    raise ValueError("Location not found")

# Get 5-day weather forecast for given coordinates
def get_forecast(lat, lon):
    forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    response = requests.get(forecast_url)
    data = response.json()
    if "list" in data:
        return [{"date": item["dt_txt"], "temperature": item["main"]["temp"], "weather": item["weather"][0]["description"]} for item in data["list"]]
    return None

# Check if rain is expected in a city
def check_rain(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()
    if "rain" in data.get("weather", [{}])[0].get("main", "").lower():
        return True
    return False

# Route for the home page
@app.route('/')
def home():
    return render_template('home.html')

# Route for weather forecast page
@app.route('/weather_forecast')
def weather_forecast():
    return render_template('index.html')

# Route for rain alert page
@app.route('/rain_alert')
def rain_alert():
    return render_template('rain.html')

# API route for getting weather forecast
@app.route('/forecast', methods=['GET'])
def forecast():
    place = request.args.get('place')
    if not place:
        return jsonify({"error": "Place name is required"}), 400
    lat, lon = get_coordinates(place)
    forecast_data = get_forecast(lat, lon)
    if forecast_data is None:
        return jsonify({"error": "Could not retrieve weather forecast"}), 500
    speak_text(f"Weather forecast for {place}")
    return jsonify({"location": place, "forecast": forecast_data})

# API route for rain alert with city name instead of geolocation
@app.route('/rain-alert', methods=['POST'])
def rain_alert_api():
    data = request.get_json()
    city = data.get("city")
    if not city:
        return jsonify({"message": "Error: City name is required"}), 400

    is_raining = check_rain(city)
    if is_raining:
        alert_message = f"Alert: Rain is expected today in {city}. Take an umbrella!"
    else:
        alert_message = f"No rain expected today in {city}. Enjoy your day!"
    speak_text(alert_message)
    
    return jsonify({"message": alert_message})

if __name__ == '__main__':
    app.run(debug=True)
