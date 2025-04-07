import DayofWeek from "./components/DayofWeek";
import rain from "../../../../../src/assets/weather_icon/Rain.png";
import cloudy_day from "../../../../../src/assets/weather_icon/Cloudy_day.png";
import cloudy from "../../../../../src/assets/weather_icon/Cloudy.png";
import sunny from "../../../../../src/assets/weather_icon/Sunny.png";


const Forecast = () => (
    <div className="flex">
        <DayofWeek imageUrl={rain} name='Saturday' date='29 Mar' temperatureRange='20~25'/>
        <DayofWeek imageUrl={cloudy_day} name='Sunday' date='30 Mar' temperatureRange='18~20'/>
        <DayofWeek imageUrl={cloudy} name='Monday' date='31 Mar' temperatureRange='20~23'/>
        <DayofWeek imageUrl={sunny} name='Tuesday' date='1 Apr' temperatureRange='28~32'/>
    </div>
)

export default Forecast;