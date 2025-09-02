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

  const API_PROXY_URL = "/api/weather-proxy";

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

      try {
        const { data } = await axios.get(API_PROXY_URL, {
          params: { lat: city.lat, lon: city.lon },
        });

        setCurrentWeather({
          city: city.name,
          lat: city.lat,
          lon: city.lon,
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
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
          shortDateTime: new Date(data.current.dt * 1000).toLocaleString(
            "en-GB",
            {
              day: "numeric",
              month: "short",
              weekday: "short",
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
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
    [API_PROXY_URL]
  );

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity, fetchWeatherData]);

  const handleCityUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <section
      aria-label="Weather card"
      className="bg-slate opacity-100 w-4/5 h-auto m-6 min-w-[360px] md:max-w-screen-lg md:aspect-[5/3] relative z-10 rounded-3xl shadow-lg grid grid-cols-2 grid-rows-11 md:grid-cols-6 md:grid-rows-6 gap-4"
    >
      <section
        aria-label="Current city weather card"
        className="row-span-6 col-span-2 m-6 md:max-lg:m-4 rounded-3xl bg-gradient-to-tl relative"
      >
        {currentWeather && (
          <CurrentCity
            data={currentWeather}
            user={user}
            onSave={handleCityUpdate}
          />
        )}
      </section>
      <section
        aria-label="Forecast"
        className="row-span-2 col-span-2 p-4 md:max-lg:m-6 md:p-0 md:row-span-3 md:col-span-4 lg:mr-8 lg:mt-8"
      >
        {forecast && <Forecast data={forecast} />}
      </section>
      <div className="row-span-1 col-span-2 p-4 md:max-lg:m-0 md:max-lg:pl-6 md:col-span-3 lg:p-0 lg:m-6">
        <SearchBar onSelectCity={setSelectedCity} />
      </div>
      <section
        aria-label="Other cities"
        className="row-span-2 col-span-2 p-4 md:row-span-2 md:col-span-4 md:max-lg:p-0 md:my-4 md:mr-8"
      >
        <OtherCities
          currentCity={selectedCity}
          onSelectCity={setSelectedCity}
          user={user}
          key={refreshKey}
        />
      </section>
    </section>
  );
};

export default WeatherCard;
