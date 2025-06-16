import City from "./Components/City/City";
import getWeatherIcon from "../../utils/getWeatherIcon";
import { useEffect, useState } from "react";
import {
  supabase,
  DEFAULT_CITY_NAMES,
  CITY_COORDINATES,
} from "../../../../lib/supabaseClient";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const OtherCities = ({ user, onSelectCity }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (cityName) => {
    const coords = CITY_COORDINATES[cityName];
    if (!coords) return null; // Prevent API call on empty city

    try {
      const oneCallURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`;
      const { data } = await axios.get(oneCallURL);
      return {
        name: cityName,
        tempRange: {
          min: data.daily[0].temp.min,
          max: data.daily[0].temp.max,
        },
        condition: data.current.weather[0].description,
      };
    } catch (error) {
      console.error(`Error fetching weather for ${cityName}:`, error);
      return {
        name: cityName,
        tempRange: { min: 0, max: 0 }, // Placeholder for temperature range
        condition: "Unknown", // Placeholder for weather condition
      };
    }
  };

  const loadCities = async () => {
    setLoading(true);

    try {
      const cityNames = [];
      if (user) {
        const { data, error } = await supabase
          .from("user_cities")
          .select("city_name")
          .eq("user_id", user.id);
        if (error) throw error;
        cityNames.push(...data.map((c) => c.city_name));
      } else {
        cityNames.push(...DEFAULT_CITY_NAMES);
      }

      const cityData = await Promise.all(cityNames.map(fetchWeather));
      setCities(cityData.filter(Boolean));
    } catch (err) {
      console.error("Error fetching cities:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCities();
  }, [user]);

  // delete cities
  const handleDelete = async (cityName) => {
    if (!user) {
      alert("Please log in to delete cities.");
      return;
    }

    try {
      const { error } = await supabase
        .from("user_cities")
        .delete()
        .eq("user_id", user.id)
        .eq("city_name", cityName);

      if (error) throw error;

      // re-render cities
      await loadCities();
    } catch (error) {
      console.error("Error deleting city:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="data-testid='other-cities' flex justify-between text-white h-full w-full">
      {cities.length > 0 ? (
        cities.map((city, index) => (
          <div key={index} className="relative">
            <City
              imageUrl={getWeatherIcon(city.condition || "Unknown")}
              name={city.name || "Unknown City"}
              temperatureRange={{
                min: city.tempRange?.min || 0,
                max: city.tempRange?.max || 0,
              }}
              className={`bg-${city.name?.replace(" ", "") || "default"}`}
              onClick={() => onSelectCity(city.name)}
            />
            <button
              className="absolute top-0 right-5 text-slate opacity-30 hover:font-bold hover:opacity-100"
              onClick={() => handleDelete(city.name)}
              title={user ? "Delete this city" : "Log in to delete cities"}
            >
              x
            </button>
          </div>
        ))
      ) : (
        <p className="text-blue font-bold mx-4">Let's save a city!</p>
      )}
    </div>
  );
};

export default OtherCities;
