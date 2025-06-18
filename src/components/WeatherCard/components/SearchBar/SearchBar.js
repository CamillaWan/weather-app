import { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSelectCity }) => {
  const [input, setInput] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchCities = async (query) => {
    if (query.length < 3) return; // Minimum 3 characters for search
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      setCityOptions(response.data || []);
    } catch (error) {
      console.error("Error fetching city options:", error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    fetchCities(e.target.value); // Fetch city options based on input
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setInput(`${city.name}, ${city.state || "Unknown"}, ${city.country}`); // Reset input field
    setCityOptions([]); // Clear city options
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (selectedCity) {
      onSelectCity({
        lat: selectedCity.lat,
        lon: selectedCity.lon,
        name: selectedCity.name, // ✅ Keep city name for display purposes
      });
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSearch}
        className="flex bg-white rounded-lg shadow-xl h-8 w-full"
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search for a city..."
          className="w-full h-full ml-2 focus:ring-1 focus:ring-purple focus:shadow-3xl focus:outline-none"
        />
        <button
          type="submit"
          className="bg-purple w-1/3 h-full rounded-lg text-white text-s hover:bg-blue"
          disabled={!selectedCity}
        >
          Search
        </button>
      </form>

      {cityOptions.length > 0 && (
        <ul className="absolute bg-white shadow-lg rounded-lg mt-2 w-full z-50">
          {cityOptions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleCitySelect(city)}
              className="p-2 hover:bg-slate cursor-pointer"
            >
              {city.name}, {city.state || "Unknown"}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
