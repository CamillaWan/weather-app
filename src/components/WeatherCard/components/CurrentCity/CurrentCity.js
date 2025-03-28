import Name from "../../../Name";
import TemperatureRange from "../../../TemperatureRange";
import WeatherIcon from "../../../WeatherIcon";
import Date from "../../../Date";
import Temperature from "./components/Temperature";
import Meta from "./components/Meta";

const CurrentCity = () => (
    <div>
        <Date />
        <Name />
        <Temperature />
        <TemperatureRange />
        <WeatherIcon />
        <Meta />
    </div>
)

export default CurrentCity;
