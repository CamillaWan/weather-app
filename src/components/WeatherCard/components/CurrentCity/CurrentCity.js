import Name from "../../../Name";
import TemperatureRange from "../../../TemperatureRange";
import WeatherIcon from "../../../WeatherIcon";
import Date from "../../../Date";
import Temperature from "./components/Temperature";
import Meta from "./components/Meta";
import Image from "./components/Image";
import bgCloudy from "../../../../assets/background/Cloudy_day_background.png"
import icon from "../../../../assets/weather_icon/Cloudy_day.png"

const CurrentCity = () => (
    <div className="flex flex-col items-center justify-between">
        <Image imageUrl={bgCloudy} alt='Cloudy' className='absolute top-0 right-0' />
        <Date value='28 March, Friday 19:20' className='text-white'/>
        <Name value='New York' className='text-white text-3xl font-bold'/>
        <Temperature value='28' className='text-slate text-5xl font-bold'/>
        <TemperatureRange value='18-29' className='text-white' />
        <WeatherIcon imageUrl={icon} alt='cloudy day icon'/>
        <Meta />
    </div>
)

export default CurrentCity;
