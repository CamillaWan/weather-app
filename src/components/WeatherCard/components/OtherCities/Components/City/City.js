import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange";
import WeatherIcon from "../../../../../WeatherIcon";

const City = ({className, imageUrl, name, temperatureRange}) => {
    return ( 
        <div className={`${className} w-full bg-cover bg-no-repeat bg-center mx-2 rounded-3xl flex flex-col justify-center items-center shadow-lg`}>
            <div className='flex flex-col items-center justify-center overflow-hidden bg-gradient-to-l opacity-70 bg-cover h-full w-full rounded-3xl'>
                <WeatherIcon className='w-1/2' imageUrl={imageUrl}/>
                <Name value={name} className='text-xs lg:text-sm xl:text-base'/>
                <TemperatureRange value={temperatureRange} className='text-xxs lg:text-xs xl:text-s'/>
            </div>
        </div>
     );
}
 
export default City;