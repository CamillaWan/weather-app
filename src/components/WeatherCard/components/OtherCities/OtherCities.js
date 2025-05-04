import City from "./Components/City/City";
import getWeatherIcon from "../../utils/getWeatherIcon";

const OtherCities = ({ data }) => {
    if (!data || data.length === 0) return <p>Loading...</p>;
  
    return (
      <div className="flex justify-between text-white h-full w-full">
        {data.map((city, index) => (
          <City
            key={index}
            imageUrl={getWeatherIcon(city.condition)}
            name={city.city} // ✅ 这里使用 `city.city`，因为 `otherCitiesData` 中 `city` 是键名
            temperatureRange={{min: city.tempRange.min, max: city.tempRange.max}}
            className={`bg-${city.city.replace(" ", "")}`} // ✅ 动态添加背景类
          />
        ))}
      </div>
    );
  };
  

export default OtherCities;