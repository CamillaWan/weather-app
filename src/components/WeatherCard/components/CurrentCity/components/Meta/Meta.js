import MetaItem from "./components/MetaItem/MetaItem";
import wind from '../../../../../../../src/assets/meta_icon/wind_speed.svg';
import Humidity from '../../../../../../../src/assets/meta_icon/humidity.svg';
import AirQuality from '../../../../../../../src/assets/meta_icon/PM2.5.svg';
import Somatosensory from '../../../../../../../src/assets/meta_icon/Somatosensory.svg';

const Meta = () => {
    return ( 
        <div className='flex justify-between bg-slate rounded-2xl w-5/6 p-4'>
            <MetaItem imageUrl={Humidity} value='85%' alt='Humidity percentage' />
            <MetaItem imageUrl={wind} value='9 km/h' alt='Wind speed'  />
            <MetaItem imageUrl={AirQuality} value='75 μg/m³' alt='PM2.5' />
            <MetaItem imageUrl={Somatosensory} value='26°C' alt='Somatosensory temperature' />
        </div>
     );
}
 
export default Meta ;