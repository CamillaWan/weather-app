import Name from "../../../../../Name";
import TemperatureRange from "../../../../../TemperatureRange";
import WeatherIcon from "../../../../../WeatherIcon";
import { memo } from "react";

const City = memo(
  ({ className, imageUrl, name, temperatureRange, onClick, onDelete }) => {
    return (
      <div
        className={`${className} opacity-100 h-full w-[22%] bg-cover bg-no-repeat bg-center rounded-3xl flex flex-col justify-center items-center relative`}
        onClick={onClick}
      >
        {onDelete && (
          <button
            aria-label="Remove this city"
            className="absolute top-0 right-4 text-white opacity-40 hover:opacity-100 hover:font-bold z-10"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from propagating to parent
              onDelete();
            }}
          >
            &times;
          </button>
        )}
        <div className="flex flex-col items-center justify-center overflow-hidden bg-gradient-to-l opacity-70 hover:opacity-100 bg-cover h-full w-full rounded-3xl">
          <WeatherIcon className="w-1/2" imageUrl={imageUrl} />
          <Name value={name} className="text-xs lg:text-sm xl:text-base" />
          <TemperatureRange
            minValue={temperatureRange.min}
            maxValue={temperatureRange.max}
            className="text-xxs lg:text-xs xl:text-s"
          />
        </div>
      </div>
    );
  }
);

export default City;
