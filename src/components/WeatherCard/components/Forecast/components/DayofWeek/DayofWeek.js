import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange";
import WeatherIcon from "../../../../../WeatherIcon";
import Date from "../../../../../Date";

const DayofWeek = () => {
    return (
        <div>
          <Name />
          <Date />
          <WeatherIcon />
          <TemperatureRange />
        </div> 
    );
}
 
export default DayofWeek;