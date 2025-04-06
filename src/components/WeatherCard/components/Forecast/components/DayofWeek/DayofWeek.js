import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange";
import WeatherIcon from "../../../../../WeatherIcon";
import Date from "../../../../../Date";

const DayofWeek = ({imageUrl, name, date, temperatureRange}) => {
    return (
        <div classname='flex flex-col'>
          <Name className='font-bold' value={name}/>
          <Date value={date}/>
          <WeatherIcon imageUrl={imageUrl} />
          <TemperatureRange value={temperatureRange}/>
        </div> 
    );
}
 
export default DayofWeek;