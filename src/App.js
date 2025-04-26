import BackgroundImage from './components/BackgroundImage';
import WeatherCard from './components/WeatherCard';
import bg from './assets/bg.png';

const App = () => (
  <BackgroundImage imageUrl= {bg} alt="cloud" className="w-screen md:h-screen md:min-h-[640px] relative bg-gradient-to-l flex justify-center md:items-center z-0 opacity-100 font-square">
   <WeatherCard />
  </BackgroundImage>
)

export default App;
