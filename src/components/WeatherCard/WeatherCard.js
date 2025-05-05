import CurrentCity from "./components/CurrentCity";
import Forecast from "./components/Forecast";
import OtherCities from "./components/OtherCities";
import SearchBar from "./components/SearchBar";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";


const WeatherCard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [otherCities, setOtherCities] = useState([]);
  const [city, setCity] = useState("Brisbane");
  const [debouncedCity] = useDebounce(city, 500);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const getCityCoordinates = async (cityName) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
      if (response.data.length > 0) {
        return { lat: response.data[0].lat, lon: response.data[0].lon };
      }
    } catch (error) {
      console.error(`Error fetching coordinates for ${cityName}:`, error);
    }
    return null;
  };


  const fetchWeatherData = useCallback(async () => {
    if (!debouncedCity) return; // Prevent API call on empty city

    const coordinates = await getCityCoordinates(debouncedCity);
    if (!coordinates) return;

    const oneCallURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(oneCallURL);
      const weatherData = response.data;

      setCurrentWeather({
        city: debouncedCity,
        temp: weatherData.current.temp,
        tempRange: { min: weatherData.daily[0].temp.min, max: weatherData.daily[0].temp.max },
        condition: weatherData.current.weather[0].description,
        humidity: weatherData.current.humidity,
        windSpeed: weatherData.current.wind_speed,
        uvIndex: weatherData.current.uvi, 
        feelsLike: weatherData.current.feels_like,
        dateTime: new Date(weatherData.current.dt * 1000).toLocaleString("en-GB", { day: "numeric", month: "long", weekday: "long", hour: "2-digit", minute: "2-digit" }),
      });

      setForecast(weatherData.daily.slice(1, 5).map(day => ({
        date: new Date(day.dt * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "long" }),
        day: new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" }),
        condition: day.weather[0].description,
        tempRange: { min: day.temp.min, max: day.temp.max }
      })));

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [debouncedCity, API_KEY]); // ✅ Correct dependency

  const fetchOtherCitiesWeather = useCallback(async () => {
    const cities = ["Sydney", "Shanghai", "New York", "London"];
    const otherCitiesData = [];

    for (const cityName of cities) {
      const coordinates = await getCityCoordinates(cityName);
      if (!coordinates) continue;

      const oneCallURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`;
      
      try {
        const response = await axios.get(oneCallURL);
        const weatherData = response.data;
        
        otherCitiesData.push({
          city: cityName,
          tempRange: { min: weatherData.daily[0].temp.min, max: weatherData.daily[0].temp.max },
          condition: weatherData.current.weather[0].description
        });

      } catch (error) {
        console.error(`Error fetching weather for ${cityName}:`, error);
      }
    }
    setOtherCities(otherCitiesData);
  }, [API_KEY]);

  useEffect(() => {
    if (debouncedCity) {
      fetchWeatherData();
    }
  }, [debouncedCity, API_KEY]); // ✅ Ensure API is called only when needed

  useEffect(() => {
    fetchOtherCitiesWeather();
  }, [API_KEY]); // ✅ Fetch other cities weather on component mount

  return (
    <div className="bg-slate opacity-100 w-4/5 h-auto m-6 min-w-[360px] md:max-w-screen-lg md:aspect-[5/3] relative z-10 rounded-3xl shadow-lg grid grid-cols-2 grid-rows-11 md:grid-cols-6 md:grid-rows-6 gap-4">
      <div className="row-span-6 col-span-2 m-6 md:max-lg:m-4 rounded-3xl bg-gradient-to-tl relative">
        <CurrentCity data={currentWeather} />
      </div>
      <div className="row-span-2 col-span-2 p-4 md:max-lg:m-6 md:p-0 md:row-span-3 md:col-span-4 lg:mr-8 lg:mt-8">
        <Forecast data={forecast} />
      </div>
      <div className="row-span-1 col-span-2 p-4 md:max-lg:m-0 md:max-lg:pl-6 md:col-span-3 lg:p-0 lg:m-6">
        <SearchBar setCity={setCity} />
      </div>
      <div className="row-span-2 col-span-2 p-4 md:row-span-2 md:col-span-4 md:max-lg:p-0 md:my-4 md:mr-8">
        <OtherCities data={otherCities}/>
      </div>
    </div>
  );
};

export default WeatherCard;