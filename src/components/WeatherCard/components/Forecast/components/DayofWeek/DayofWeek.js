import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange";
import WeatherIcon from "../../../../../WeatherIcon";
import Date from "../../../../../Date";

const DayofWeek = ({imageUrl, alt}) => {
    return (
        <div classname='flex flex-col items-center justify-between'>
          <Name />
          <Date />
          <WeatherIcon imageUrl={imageUrl} alt={alt}/>
          <TemperatureRange />
        </div> 
    );
}
 
export default DayofWeek;