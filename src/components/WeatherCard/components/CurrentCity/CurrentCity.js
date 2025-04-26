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
    <div className="flex flex-col items-center justify-between p-4 md:max-lg:p-3 h-full w-full">
        <Image imageUrl={bgCloudy} alt='Cloudy' className='absolute top-0 right-0' />
        <Date value='28 March, Friday 19:20' className='text-slate text-sm sm:text-lg md:text-xxs lg:text-sm xl:text-base'/>
        <Name value='New York' className='text-white text-2xl sm:3xl font-bold m-2 md:max-lg:text-lg xl:text-3xl md:max-lg:m-0'/>
        <Temperature value='28' className='text-slate text-5xl sm:text-7xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-2'/>
        <TemperatureRange value='18~29' className='text-slate text-base sm:text-lg md:max-lg:text-sm' />
        <WeatherIcon imageUrl={icon} alt='cloudy day icon' className='w-2/3'/>
        <Meta />
    </div>
)

export default CurrentCity;
