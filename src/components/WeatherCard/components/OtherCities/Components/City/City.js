import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange";
import WeatherIcon from "../../../../../WeatherIcon";

const City = ({className, imageUrl, name, temperatureRange}) => {
    return ( 
        <div className={`${className} bg-cover bg-no-repeat bg-center m-4 w-full h-full rounded-3xl flex flex-col justify-center items-center shadow-lg`}>
            <div className='bg-gradient-to-l opacity-70 bg-cover rounded-3xl'>
            <WeatherIcon imageUrl={imageUrl}/>
            <Name value={name} />
            <TemperatureRange value={temperatureRange} />
            </div>
        </div>
     );
}
 
export default City;