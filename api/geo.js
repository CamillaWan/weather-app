export default async function handler(req, res) {
  const { q } = req.query;
  const apiKey = process.env.OPENWEATHER_KEY;

  if (!q || q.length < 3) {
    return res.status(400).json({ error: "Missing or short query" });
  }

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    q
  )}&limit=5&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch location data" });
  }
}
