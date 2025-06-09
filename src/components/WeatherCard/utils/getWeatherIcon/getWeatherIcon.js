import cloudyDayIcon from "../../../../assets/weather_icon/Cloudy_day.png";
import cloudyIcon from "../../../../assets/weather_icon/Cloudy.png";
import showerRainIcon from "../../../../assets/weather_icon/shower.png";
import rainIcon from "../../../../assets/weather_icon/Rain.png";
import snowIcon from "../../../../assets/weather_icon/Snow.png";
import sunnyIcon from "../../../../assets/weather_icon/Sunny.png";

const getWeatherIcon = (condition) => {
  if (condition.includes("clear")) return sunnyIcon;
  if (condition.includes("few clouds")) return cloudyDayIcon;
  if (
    condition.includes("drizzle") ||
    condition.includes("thunderstorm") ||
    condition.includes("shower rain")
  )
    return showerRainIcon;
  if (condition.includes("rain") && !condition.includes("shower"))
    return rainIcon;
  if (condition.includes("snow")) return snowIcon;
  return cloudyIcon;
};

export default getWeatherIcon;
