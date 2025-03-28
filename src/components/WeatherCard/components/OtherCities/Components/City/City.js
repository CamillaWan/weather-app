import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange";
import WeatherIcon from "../../../../../WeatherIcon";

const City = () => {
    return ( 
        <div>
            <WeatherIcon />
            <Name />
            <TemperatureRange />
        </div>
     );
}
 
export default City;