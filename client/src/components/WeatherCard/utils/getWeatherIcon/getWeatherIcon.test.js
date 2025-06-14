import getWeatherIcon from "./getWeatherIcon";
import cloudyDayIcon from "../../../../assets/weather_icon/Cloudy_day.png";
import cloudyIcon from "../../../../assets/weather_icon/Cloudy.png";
import showerRainIcon from "../../../../assets/weather_icon/shower.png";
import rainIcon from "../../../../assets/weather_icon/Rain.png";
import snowIcon from "../../../../assets/weather_icon/Snow.png";
import sunnyIcon from "../../../../assets/weather_icon/Sunny.png";

test("returns correct weather icon for 'clear' condition", () => {
  expect(getWeatherIcon("clear")).toBe(sunnyIcon);
});

test("returns correct weather icon for 'few clouds' condition", () => {
  expect(getWeatherIcon("few clouds")).toBe(cloudyDayIcon);
});

test("returns correct weather icon for 'drizzle', 'thunderstorm' or 'shower rain'", () => {
  expect(getWeatherIcon("drizzle")).toBe(showerRainIcon);
  expect(getWeatherIcon("thunderstorm")).toBe(showerRainIcon);
  expect(getWeatherIcon("shower rain")).toBe(showerRainIcon);
});

test("returns correct weather icon for 'very heavy rain' condition", () => {
  expect(getWeatherIcon("very heavy rain")).toBe(rainIcon);
});

test("returns correct weather icon for 'shower snow' condition", () => {
  expect(getWeatherIcon("shower snow")).toBe(snowIcon);
});

test("returns default cloudy icon for unknown condition", () => {
  expect(getWeatherIcon("random unknown weather")).toBe(cloudyIcon);
});
