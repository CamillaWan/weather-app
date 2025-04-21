import CurrentCity from "./components/CurrentCity";
import Forecast from "./components/Forecast";
import OtherCities from "./components/OtherCities";
import SearchBar from "./components/SearchBar";

const WeatherCard = () => {
    return(
    <div className="bg-slate opacity-100 max-w-screen-lg aspect-[5/3] w-2/3 relative z-10 mx-auto rounded-3xl overflow-hidden shadow-lg grid grid-cols-6 grid-rows-6 gap-4">
        <div className="row-span-6 col-span-2 m-6 rounded-3xl bg-gradient-to-tl relative" >
            <CurrentCity />
        </div>
        <div className="row-span-3 col-span-4 mr-8 my-8">
            <Forecast />
        </div>
        <div className="row-span-1 col-span-2 p-2 mt-10">
            <SearchBar />
        </div>
        <div className="row-span-2 col-span-4 my-6 mr-8">
            <OtherCities /> 
        </div>
             
    </div>
    )
} 

export default WeatherCard;