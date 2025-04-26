const SearchBar = () => (
    <div className="flex flex-nowrap justify-between items-center bg-white rounded-lg shadow-xl h-8 w-full">
        <input type="text" placeholder="Search for a city..." className="w-full h-full m-2 focus:ring-1 focus:ring-purple focus:shadow-3xl focus:outline-none"/>
        <button type="submit" className="bg-purple w-1/3 h-full rounded-lg text-white text-s hover:bg-blue">Search</button>
    </div>
)

export default SearchBar;