import City from "./Components/City/City";
import getWeatherIcon from "../../utils/getWeatherIcon";

const OtherCities = ({ data, setCity }) => {
    if (!data || data.length === 0) return <p>Loading...</p>;
  
    return (
      <div className="flex justify-between text-white h-full w-full">
        {data.map((city, index) => (
          <City
            key={index}
            imageUrl={getWeatherIcon(city.condition)}
            name={city.city} 
            temperatureRange={{min: city.tempRange.min, max: city.tempRange.max}}
            className={`bg-${city.city.replace(" ", "")}`} 
            onClick={() => {
              console.log(`Clicked city: ${city.city}`);
              setCity(city.city);
            }}
          />
        ))}
      </div>
    );
  };
  

export default OtherCities;