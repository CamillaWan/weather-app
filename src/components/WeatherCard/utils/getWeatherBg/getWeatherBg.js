import Cloudy_day_background from "../../../../assets/background/Cloudy_day_background.png";
import Hail_background from "../../../../assets/background/Hail_background.png";
import Rain_background from "../../../../assets/background/Rain_background.png";
import Snow_background from "../../../../assets/background/Snow_background.png";
import Sunny_day_background from "../../../../assets/background/Sunny_day_background.png";

const getWeatherBg = (condition) => {
  if (condition.includes("clear")) return Sunny_day_background;
  if (
    condition.includes("drizzle") ||
    condition.includes("thunderstorm") ||
    condition.includes("rain")
  )
    return Rain_background;
  if (condition.includes("snow")) return Snow_background;
  if (condition.includes("hail") || condition.includes("sleet"))
    return Hail_background;
  return Cloudy_day_background;
};

export default getWeatherBg;
