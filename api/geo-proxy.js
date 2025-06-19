export default async function handler(req, res) {
  const { q } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!q || !apiKey) {
    return res.status(400).json({ error: "Missing parameters or API key" });
  }

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${apiKey}`;

  try {
    const geoRes = await fetch(url);

    const data = await geoRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Geo fetch failed" });
  }
}
