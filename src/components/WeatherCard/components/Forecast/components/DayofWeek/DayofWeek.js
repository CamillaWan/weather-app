import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange";
import WeatherIcon from "../../../../../WeatherIcon";
import Date from "../../../../../Date";

const DayofWeek = ({imageUrl, day, date, temperatureRange}) => {
    return (
        <div className='flex flex-col items-center justify-center'>
          <Name className='font-bold text-sm lg:text-base' value={day}/>
          <Date value={date} className='text-sm sm:text-base md:max-lg:text-sm lg:text-base'/>
          <WeatherIcon imageUrl={imageUrl} className='px-2'/>
          <TemperatureRange minValue={temperatureRange.min} maxValue={temperatureRange.max} className='text-sm sm:text-base md:max-lg:text-sm xl:text-base'/>
        </div> 
    );
}
 
export default DayofWeek;