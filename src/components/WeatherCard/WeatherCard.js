import CurrentCity from "./components/CurrentCity";
import Forecast from "./components/Forecast";
import OtherCities from "./components/OtherCities";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";

const WeatherCard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast,setForecast] = useState(null);
  const[city, setCity] = useState('Brisbane');
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeatherData = async () => {
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(currentWeatherURL),
        axios.get(forecastURL),
      ]);
      setCurrentWeather(currentResponse.data);
      setForecast(forecastResponse.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData(); 
  }, [city]); 

    return(
    <div className="bg-slate opacity-100 w-4/5 h-auto m-6 min-w-[360px] md:max-w-screen-lg md:aspect-[5/3] relative z-10 rounded-3xl shadow-lg grid grid-cols-2 grid-rows-11 md:grid-cols-6 md:grid-rows-6 gap-4">
        <div className="row-span-6 col-span-2 m-6 md:max-lg:m-4 rounded-3xl bg-gradient-to-tl relative" >
            <CurrentCity data={currentWeather}/>
        </div>
        <div className="row-span-2 col-span-2 p-4 md:max-lg:m-6 md:p-0 md:row-span-3 md:col-span-4 lg:mr-8 lg:mt-8">
            <Forecast data={forecast}/>
        </div>
        <div className="row-span-1 col-span-2 p-4 md:max-lg:m-0 md:max-lg:pl-6 md:col-span-3 lg:p-0 lg:m-6">
            <SearchBar />
        </div>
        <div className="row-span-2 col-span-2 p-4 md:row-span-2 md:col-span-4 md:max-lg:p-0 md:my-4 md:mr-8">
            <OtherCities /> 
        </div>
             
    </div>
    )
} 

export default WeatherCard;