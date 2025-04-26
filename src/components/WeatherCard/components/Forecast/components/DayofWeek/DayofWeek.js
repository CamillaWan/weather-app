import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange";
import WeatherIcon from "../../../../../WeatherIcon";
import Date from "../../../../../Date";

const DayofWeek = ({imageUrl, name, date, temperatureRange}) => {
    return (
        <div classname='flex items-center justify-center'>
          <Name className='font-bold text-sm lg:text-base' value={name}/>
          <Date value={date} className='text-sm sm:text-base md:max-lg:text-sm lg:text-base'/>
          <WeatherIcon imageUrl={imageUrl} className='px-2'/>
          <TemperatureRange value={temperatureRange} className='text-sm sm:text-base md:max-lg:text-sm xl:text-base'/>
        </div> 
    );
}
 
export default DayofWeek;