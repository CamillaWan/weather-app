// /api/weather.js
module.exports = async function handler(req, res) {
  const { lat, lon } = req.query;
  const apiKey = process.env.OPENWEATHER_KEY;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat or lon" });
  }

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
