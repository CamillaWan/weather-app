import DayofWeek from "./components/DayofWeek";
import  getWeatherIcon  from "../../utils/getWeatherIcon";

const Forecast = ({ data }) => {
    if (!data) return <p>Loading...</p>;
  
    return (
    <div className="flex">
        {data.map((day, index) => (
          <DayofWeek
            key={index}
            imageUrl={getWeatherIcon(day.condition)}
            day={day.day} 
            date={day.date} 
            temperatureRange={{
                min: day.tempRange.min, 
                max: day.tempRange.max
            }}
          />
        ))}
    </div>
  );
};

export default Forecast;