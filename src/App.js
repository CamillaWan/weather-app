import BackgroundImage from './components/BackgroundImage';
import WeatherCard from './components/WeatherCard';
import bg from './assets/bg.png';

const App = () => (
  <BackgroundImage imageUrl={bg} alt="cloud" className="w-screen h-screen">
   <WeatherCard />
  </BackgroundImage>
)

export default App;
