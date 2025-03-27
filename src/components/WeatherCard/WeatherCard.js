import CurrentCity from "./components/CurrentCity";
import Forecast from "./components/Forecast";
import OtherCities from "./components/OtherCities";
import SearchBar from "./components/SearchBar";

const WeatherCard = () => {
    return(
    <div className="bg-white opacity-100 relative z-10 w-4/5 h-4/5 mx-auto isolation-auto rounded-3xl overflow-hidden shadow-lg font-alimama">
        <CurrentCity />
        <Forecast />
        <SearchBar />
        <OtherCities />      
    </div>
    )
} 

export default WeatherCard;