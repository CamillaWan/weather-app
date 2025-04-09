import BackgroundImage from './components/BackgroundImage';
import WeatherCard from './components/WeatherCard';
import bg from './assets/bg.png';

const App = () => (
  <BackgroundImage imageUrl= {bg} alt="cloud" className="h-screen w-screen bg-cover absolute inset-0 bg-gradient-to-l flex justify-center items-center z-0 opacity-100 font-alimama">
   <WeatherCard />
  </BackgroundImage>
)

export default App;
