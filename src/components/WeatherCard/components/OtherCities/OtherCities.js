import City from "./Components/City/City";
import getWeatherIcon from "../../utils/getWeatherIcon";

const OtherCities = ({ data, setSelectedCoordinates }) => {
  if (data.length === 0) return <p>Loading...</p>;

  return (
    <div className="data-testid='other-cities' flex justify-between text-white h-full w-full">
      {data.map((city, index) => (
        <City
          key={index}
          imageUrl={getWeatherIcon(city.condition || "Unknown")}
          name={city.name || "Unknown City"}
          temperatureRange={{
            min: city.tempRange?.min || 0,
            max: city.tempRange?.max || 0,
          }}
          className={`bg-${city.name?.replace(" ", "") || "default"}`}
          onClick={() => setSelectedCoordinates(city)}
        />
      ))}
    </div>
  );
};

export default OtherCities;
