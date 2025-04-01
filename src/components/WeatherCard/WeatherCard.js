import CurrentCity from "./components/CurrentCity";
import Forecast from "./components/Forecast";
import OtherCities from "./components/OtherCities";
import SearchBar from "./components/SearchBar";

const WeatherCard = () => {
    return(
    <div className="bg-slate opacity-100 relative z-10 w-4/5 h-4/5 mx-auto isolation-auto rounded-3xl overflow-hidden shadow-lg grid grid-cols-6 grid-rows-6 gap-4">
        <div className="row-span-6 col-span-2 m-6 rounded-3xl bg-gradient-to-tl relative" >
            <CurrentCity />
        </div>
        <div className="row-span-3 col-span-4 m-6 ">
            <Forecast />
        </div>
        <div className="row-span-1 col-span-2 p-2 m-6 ">
            <SearchBar />
        </div>
        <div className="row-span-2 col-span-4 border-8 m-6">
            <OtherCities /> 
        </div>
             
    </div>
    )
} 

export default WeatherCard;