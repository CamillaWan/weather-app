import Name from "../../../Name";
import TemperatureRange from "../../../TemperatureRange";
import WeatherIcon from "../../../WeatherIcon";
import Date from "../../../Date";
import Temperature from "./components/Temperature";
import Meta from "./components/Meta";
import Image from "./components/Image";
import getWeatherIcon from "../../utils/getWeatherIcon/getWeatherIcon";
import getWeatherBg from "../../utils/getWeatherBg/getWeatherBg";
import {
  supabase,
  CITY_COORDINATES,
  DEFAULT_CITY_NAMES,
} from "../../../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CurrentCity = ({ data, user, onSave, refreshKey }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!data?.lat || !data?.lon) return;

      if (!user) {
        const isDefault = DEFAULT_CITY_NAMES.some((name) => {
          const coords = CITY_COORDINATES[name];
          return coords.lat === data.lat && coords.lon === data.lon;
        });
        setIsFavorited(isDefault);
        return;
      }

      const { data: match, error } = await supabase
        .from("user_cities")
        .select("id")
        .eq("user_id", user.id)
        .eq("lat", data.lat)
        .eq("lon", data.lon);

      if (error) {
        console.error("Error checking favorite city:", error.message);
        setIsFavorited(false);
      } else {
        setIsFavorited(match.length > 0);
      }
      const newState = match.length > 0;
      if (newState !== isFavorited) {
        setIsFavorited(newState);
      }
    };
    checkFavorite();
  }, [data, user, refreshKey]);

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Please log in to save cities.");
      return;
    }

    try {
      if (isFavorited) {
        const { error } = await supabase
          .from("user_cities")
          .delete()
          .eq("user_id", user.id)
          .eq("lat", data.lat)
          .eq("lon", data.lon);
        if (error) throw error;
        setIsFavorited(false);
        onSave?.();
      } else {
        const { data: allCities, error: countError } = await supabase
          .from("user_cities")
          .select("*")
          .eq("user_id", user.id);

        if (countError) throw countError;
        if (allCities.length >= 4) {
          alert("You can only save up to 4 cities.");
          return;
        }

        const { error: insertError } = await supabase
          .from("user_cities")
          .insert({
            user_id: user.id,
            city_name: data.city,
            lat: data.lat,
            lon: data.lon,
          });

        if (insertError) throw insertError;
        setIsFavorited(true);
        onSave?.();
      }
    } catch (error) {
      console.error("Error toggling favorite city:", error.message);
    }
  };
  console.log(data.dateTime);
  if (!data) return <p>Loading...</p>;

  return (
    <div className="h-full w-full flex flex-col items-center justify-between p-4 md:max-lg:p-3">
      <Image
        imageUrl={getWeatherBg(data.condition)}
        alt="Weather condition"
        className="absolute top-0 right-0"
      />
      <div className="flex items-center justify-between w-full">
        <Date
          value={data.dateTime}
          className="hidden xl:block text-base text-slate "
        />
        <Date
          value={data.shortDateTime}
          className="block text-slate text-sm sm:text-lg md:text-xxs lg:text-sm xl:hidden"
        />
        <motion.button
          whileTap={{ scale: 1.2, rotate: 20 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleToggleFavorite}
          className="absolute top-2 right-4 text-white text-2xl z-20"
          aria-label="Save city or remove from saved cities"
        >
          {isFavorited ? "★" : "☆"}
        </motion.button>
      </div>
      <Name
        value={data.city}
        className="text-white w-full whitespace-wrap text-2xl sm:text-3xl font-bold m-2 md:max-lg:text-lg xl:text-3xl md:max-lg:m-0"
      />
      <Temperature
        value={data.temp}
        className="text-slate text-5xl sm:text-7xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-2"
      />
      <TemperatureRange
        minValue={data.tempRange.min}
        maxValue={data.tempRange.max}
        className="text-slate text-base sm:text-lg md:max-lg:text-sm"
      />
      <WeatherIcon
        imageUrl={getWeatherIcon(data.condition)}
        alt={data.condition}
        className="w-2/3"
      />
      <Meta
        humidity={data.humidity}
        windSpeed={data.windSpeed}
        uvIndex={data.uvIndex}
        feelsLike={data.feelsLike}
      />
    </div>
  );
};

export default CurrentCity;
