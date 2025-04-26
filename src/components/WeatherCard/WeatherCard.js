import CurrentCity from "./components/CurrentCity";
import Forecast from "./components/Forecast";
import OtherCities from "./components/OtherCities";
import SearchBar from "./components/SearchBar";

const WeatherCard = () => {
    return(
    <div className="bg-slate opacity-100 w-4/5 h-auto m-6 min-w-[360px] md:max-w-screen-lg md:aspect-[5/3]  relative z-10 rounded-3xl shadow-lg grid grid-cols-2 grid-rows-11 md:grid-cols-6 md:grid-rows-6 gap-4">
        <div className="row-span-6 col-span-2 m-6 md:max-lg:m-4 rounded-3xl bg-gradient-to-tl relative" >
            <CurrentCity />
        </div>
        <div className="row-span-2 col-span-2 p-4 md:max-lg:m-6 md:p-0 md:row-span-3 md:col-span-4 lg:mr-8 lg:mt-8">
            <Forecast />
        </div>
        <div className="row-span-1 col-span-2 p-4 md:max-lg:m-0 md:max-lg:pl-6 md:col-span-3 lg:p-0 lg:m-6">
            <SearchBar />
        </div>
        <div className="row-span-2 col-span-2 p-4 md:row-span-2 md:col-span-4 md:max-lg:p-0 md:my-4 md:mr-8">
            <OtherCities /> 
        </div>
             
    </div>
    )
} 

export default WeatherCard;