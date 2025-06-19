import City from "./Components/City/City";
import getWeatherIcon from "../../utils/getWeatherIcon";
import { useEffect, useState } from "react";
import {
  supabase,
  DEFAULT_CITY_NAMES,
  CITY_COORDINATES,
} from "../../../../lib/supabaseClient";
import axios from "axios";

const API_PROXY_URL = "/api/weather-proxy";

const OtherCities = ({ user, onSelectCity }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async ({ city_name, lat, lon }) => {
    if (!lat || !lon) return null;

    try {
      const { data } = await axios.get(API_PROXY_URL, {
        params: { lat, lon },
      });
      return {
        name: city_name,
        lat,
        lon,
        tempRange: {
          min: data.daily[0].temp.min,
          max: data.daily[0].temp.max,
        },
        condition: data.current.weather[0].description,
      };
    } catch (error) {
      console.error(`Error fetching weather for ${city_name}:`, error);
      return {
        name: city_name,
        lat,
        lon,
        tempRange: { min: 0, max: 0 }, // Placeholder for temperature range
        condition: "Unknown", // Placeholder for weather condition
      };
    }
  };

  const loadCities = async () => {
    setLoading(true);

    try {
      let cityList = [];

      if (user) {
        const { data, error } = await supabase
          .from("user_cities")
          .select("city_name, lat, lon")
          .eq("user_id", user.id);

        if (error) throw error;
        cityList = data;
      } else {
        cityList = DEFAULT_CITY_NAMES.map((name) => ({
          city_name: name,
          ...CITY_COORDINATES[name],
        }));
      }

      const cityData = await Promise.all(
        cityList.map((city) => fetchWeather(city))
      );
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
  const handleDelete = async (city) => {
    if (!user) {
      alert("Please log in to delete cities.");
      return;
    }

    try {
      const { error } = await supabase
        .from("user_cities")
        .delete()
        .eq("user_id", user.id)
        .eq("lat", city.lat)
        .eq("lon", city.lon);

      if (error) throw error;

      setCities((prev) =>
        prev.filter((c) => !(c.lat === city.lat && c.lon === city.lon))
      );
    } catch (error) {
      console.error("Error deleting city:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="data-testid='other-cities' flex gap-4 px-4 text-white h-full w-full">
      {cities.length > 0 ? (
        cities.map((city, index) => (
          <City
            key={`${city.lat}-${city.lon}-${index}`}
            imageUrl={getWeatherIcon(city.condition || "Unknown")}
            name={city.name || "Unknown City"}
            temperatureRange={{
              min: city.tempRange?.min || 0,
              max: city.tempRange?.max || 0,
            }}
            className={`bg-${city.name?.replace(" ", "") || "default"}`}
            onClick={() => onSelectCity(city)}
            onDelete={() => handleDelete(city)}
          />
        ))
      ) : (
        <p className="text-blue font-bold mx-4">Let's save a city!</p>
      )}
    </div>
  );
};

export default OtherCities;
