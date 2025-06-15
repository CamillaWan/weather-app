import CurrentCity from "./components/CurrentCity";
import Forecast from "./components/Forecast";
import OtherCities from "./components/OtherCities";
import SearchBar from "./components/SearchBar";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://weather-app.vercel.app/api";

const WeatherCard = () => {
  const cities = [
    { name: "Brisbane", lat: -27.4698, lon: 153.0251 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Shanghai", lat: 31.2304, lon: 121.4737 },
    { name: "New York", lat: 40.7128, lon: -74.006 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
  ];

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [otherCitiesWeather, setOtherCitiesWeather] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(cities[0]);

  const fetchWeatherData = useCallback(async () => {
    if (!selectedCoordinates) return; // Prevent API call on empty city

    try {
      const response = await axios.get(
        `${API_BASE_URL}/weather?lat=${selectedCoordinates.lat}&lon=${selectedCoordinates.lon}`
      );
      const weatherData = response.data;

      setCurrentWeather({
        city: selectedCoordinates.name,
        temp: weatherData.current.temp,
        tempRange: {
          min: weatherData.daily[0].temp.min,
          max: weatherData.daily[0].temp.max,
        },
        condition: weatherData.current.weather[0].description,
        humidity: weatherData.current.humidity,
        windSpeed: weatherData.current.wind_speed,
        uvIndex: weatherData.current.uvi,
        feelsLike: weatherData.current.feels_like,
        dateTime: new Date(weatherData.current.dt * 1000).toLocaleString(
          "en-GB",
          {
            day: "numeric",
            month: "long",
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
      });

      setForecast(
        weatherData.daily.slice(1, 5).map((day) => ({
          date: new Date(day.dt * 1000).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
          }),
          day: new Date(day.dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",
          }),
          condition: day.weather[0].description,
          tempRange: { min: day.temp.min, max: day.temp.max },
        }))
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [selectedCoordinates]);

  const fetchOtherCitiesWeather = useCallback(async () => {
    const otherCitiesData = [];

    for (const city of cities.slice(1)) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/weather?lat=${selectedCoordinates.lat}&lon=${selectedCoordinates.lon}`
        );
        const weatherData = response.data;

        otherCitiesData.push({
          ...city,
          tempRange: {
            min: weatherData.daily[0].temp.min,
            max: weatherData.daily[0].temp.max,
          },
          condition: weatherData.current.weather[0].description,
        });
      } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
      }
    }
    setOtherCitiesWeather(otherCitiesData);
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [selectedCoordinates, fetchWeatherData]);

  useEffect(() => {
    fetchOtherCitiesWeather();
  }, [fetchOtherCitiesWeather]);

  return (
    <div className="bg-slate opacity-100 w-4/5 h-auto m-6 min-w-[360px] md:max-w-screen-lg md:aspect-[5/3] relative z-10 rounded-3xl shadow-lg grid grid-cols-2 grid-rows-11 md:grid-cols-6 md:grid-rows-6 gap-4">
      <div className="row-span-6 col-span-2 m-6 md:max-lg:m-4 rounded-3xl bg-gradient-to-tl relative">
        <CurrentCity data={currentWeather} />
      </div>
      <div className="row-span-2 col-span-2 p-4 md:max-lg:m-6 md:p-0 md:row-span-3 md:col-span-4 lg:mr-8 lg:mt-8">
        <Forecast data={forecast} />
      </div>
      <div className="row-span-1 col-span-2 p-4 md:max-lg:m-0 md:max-lg:pl-6 md:col-span-3 lg:p-0 lg:m-6">
        <SearchBar setSelectedCoordinates={setSelectedCoordinates} />
      </div>
      <div className="row-span-2 col-span-2 p-4 md:row-span-2 md:col-span-4 md:max-lg:p-0 md:my-4 md:mr-8">
        <OtherCities
          data={otherCitiesWeather}
          setSelectedCoordinates={setSelectedCoordinates}
        />
      </div>
    </div>
  );
};

export default WeatherCard;
