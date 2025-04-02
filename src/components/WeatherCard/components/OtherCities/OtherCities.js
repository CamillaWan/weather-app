import City from "./Components/City/City";
import sunny from '../../../../assets/weather_icon/Sunny.png';
import cloudy from '../../../../assets/weather_icon/Cloudy.png';        
import rain from '../../../../assets/weather_icon/Rain.png';
import snow from '../../../../assets/weather_icon/Snow.png';

const OtherCities = () => (
    <div className='flex justify-between text-white'>
        <City className='bg-Sydney' imageUrl={sunny} name='Sydney' temperatureRange='28~32'/>
        <City className='bg-Shanghai' imageUrl={cloudy} name='Shanghai' temperatureRange='20~23'/>
        <City className='bg-Newyork' imageUrl={rain} name='New York' temperatureRange='20~28'/>
        <City className='bg-London' imageUrl={snow} name='London' temperatureRange='0~2'/>
    </div>
)

export default OtherCities;