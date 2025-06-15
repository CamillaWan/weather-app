import { useEffect, useState } from "react";
import BackgroundImage from "./components/BackgroundImage";
import WeatherCard from "./components/WeatherCard";
import HeaderBar from "./components/HeaderBar";
import AuthPanel from "./components/AuthPanel";
import { supabase } from "./lib/supabaseClient";
import bg from "./assets/bg.png";

const App = () => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  // on mount, check session
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      if (res.data?.user) setUser(res.data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  const handleLoginClick = () => setShowAuth(true);
  const handleLoginSuccess = (user) => {
    setUser(user);
    setShowAuth(false);
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowAuth(false);
  };

  return (
    <BackgroundImage
      imageUrl={bg}
      alt="cloud"
      className="w-screen md:h-screen md:min-h-[640px] relative bg-gradient-to-l flex flex-col items-center z-0 opacity-100 font-square"
    >
      <HeaderBar
        user={user}
        showAuth={showAuth}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
        onCancel={() => setShowAuth(false)}
      />

      {showAuth ? (
        <AuthPanel
          onLoginSuccess={handleLoginSuccess}
          onCancel={() => setShowAuth(false)}
        />
      ) : (
        <WeatherCard />
      )}
    </BackgroundImage>
  );
};

export default App;
