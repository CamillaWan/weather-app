import MetaItem from "./components/MetaItem/MetaItem";
import wind from "../../../../../../../src/assets/meta_icon/wind_speed.svg";
import Humidity from "../../../../../../../src/assets/meta_icon/humidity.svg";
import UVi from "../../../../../../../src/assets/meta_icon/uv-index.svg";
import Somatosensory from "../../../../../../../src/assets/meta_icon/Somatosensory.svg";

const Meta = ({ humidity, windSpeed, uvIndex, feelsLike }) => {
  return (
    <section
      aria-label="weather stats"
      className="flex justify-between bg-slate rounded-2xl w-full p-2 md:max-lg:p-1 xl:p-4 overflow-hidden"
    >
      <MetaItem
        imageUrl={Humidity}
        value={`${humidity}%`}
        alt="Humidity percentage"
      />
      <MetaItem
        imageUrl={wind}
        value={`${windSpeed.toFixed(1)}km/h`}
        alt="Wind speed"
      />
      <MetaItem imageUrl={UVi} value={Math.round(uvIndex)} alt="UV index" />
      <MetaItem
        imageUrl={Somatosensory}
        value={`${Math.round(feelsLike)}°C`}
        alt="Somatosensory temperature"
      />
    </section>
  );
};

export default Meta;
