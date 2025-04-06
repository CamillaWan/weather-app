import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange";
import WeatherIcon from "../../../../../WeatherIcon";

const City = ({className, imageUrl, name, temperatureRange}) => {
    return ( 
        <div className={`${className} h-full w-full bg-cover bg-no-repeat bg-center mx-2 rounded-3xl flex flex-col justify-center items-center shadow-lg`}>
            <div className='flex flex-col items-center overflow-hidden bg-gradient-to-l opacity-70 bg-cover h-full w-full rounded-3xl'>
                <WeatherIcon className='w-16 h-16' imageUrl={imageUrl}/>
                <Name value={name} />
                <TemperatureRange value={temperatureRange} className='text-xs'/>
            </div>
        </div>
     );
}
 
export default City;