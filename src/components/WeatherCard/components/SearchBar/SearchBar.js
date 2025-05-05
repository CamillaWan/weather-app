import { useState } from "react";

const SearchBar = ({ setCity }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (input.trim()) {
      setCity(input.trim()); // Update parent city state
      setInput(""); // Reset input field
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-nowrap justify-between items-center bg-white rounded-lg shadow-xl h-8 w-full"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)} // Update local input state
        placeholder="Search for a city..."
        className="w-full h-full m-2 focus:ring-1 focus:ring-purple focus:shadow-3xl focus:outline-none"
      />
      <button
        type="submit"
        className="bg-purple w-1/3 h-full rounded-lg text-white text-s hover:bg-blue"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
