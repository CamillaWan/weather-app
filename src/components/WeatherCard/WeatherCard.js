import CurrentCity from "./components/CurrentCity";
import Forecast from "./components/Forecast";
import OtherCities from "./components/OtherCities";
import SearchBar from "./components/SearchBar";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { supabase } from "../../lib/supabaseClient";

const WeatherCard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [selectedCity, setSelectedCity] = useState({
    name: "Brisbane",
    lat: -27.4698,
    lon: 153.0251,
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [user, setUser] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Failed to get session:", error.message);
      } else {
        setUser(session?.user ?? null);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchWeatherData = useCallback(
    async (city) => {
      if (!city || !city.lat || !city.lon) return; // Prevent API call on empty city

      const oneCallURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`;

      try {
        const { data } = await axios.get(oneCallURL);

        setCurrentWeather({
          city: city.name,
          temp: data.current.temp,
          tempRange: {
            min: data.daily[0].temp.min,
            max: data.daily[0].temp.max,
          },
          condition: data.current.weather[0].description,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_speed,
          uvIndex: data.current.uvi,
          feelsLike: data.current.feels_like,
          dateTime: new Date(data.current.dt * 1000).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
          }),
        });

        setForecast(
          data.daily.slice(1, 5).map((day) => ({
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
    },
    [API_KEY]
  );

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity, fetchWeatherData]);

  const handleCityUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="bg-slate opacity-100 w-4/5 h-auto m-6 min-w-[360px] md:max-w-screen-lg md:aspect-[5/3] relative z-10 rounded-3xl shadow-lg grid grid-cols-2 grid-rows-11 md:grid-cols-6 md:grid-rows-6 gap-4">
      <div className="row-span-6 col-span-2 m-6 md:max-lg:m-4 rounded-3xl bg-gradient-to-tl relative">
        {currentWeather && (
          <CurrentCity
            data={currentWeather}
            user={user}
            onSave={handleCityUpdate}
          />
        )}
      </div>
      <div className="row-span-2 col-span-2 p-4 md:max-lg:m-6 md:p-0 md:row-span-3 md:col-span-4 lg:mr-8 lg:mt-8">
        {forecast && <Forecast data={forecast} />}
      </div>
      <div className="row-span-1 col-span-2 p-4 md:max-lg:m-0 md:max-lg:pl-6 md:col-span-3 lg:p-0 lg:m-6">
        <SearchBar onSelectCity={setSelectedCity} />
      </div>
      <div className="row-span-2 col-span-2 p-4 md:row-span-2 md:col-span-4 md:max-lg:p-0 md:my-4 md:mr-8">
        <OtherCities
          currentCity={selectedCity}
          onSelectCity={setSelectedCity}
          user={user}
          key={refreshKey}
        />
      </div>
    </div>
  );
};

export default WeatherCard;
