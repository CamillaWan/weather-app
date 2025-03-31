import DayofWeek from "./components/DayofWeek";
import rain from "../../../../../src/assets/weather_icon/Rain.png";
const Forecast = () => (
    <div className="flex">
        <DayofWeek imageUrl={rain} />
        <DayofWeek imageUrl={cloudy_day} />
        <DayofWeek imageUrl={cloudy} />
        <DayofWeek imageUrl={sunny} />
    </div>
)

export default Forecast;