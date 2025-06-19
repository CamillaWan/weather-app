const HeaderBar = ({ user, showAuth, onLoginClick, onLogout, onCancel }) => {
  const name = user?.user_metadata?.name || user?.email || "User";

  return (
    <header className="w-full flex justify-between items-center px-6 py-3 text-white shadow">
      <h1 className=" text-base md:text-lg font-bold tracking-wide">
        Camilla's Weather App
      </h1>

      <div>
        {showAuth ? (
          <button
            onClick={onCancel}
            className="text-white  px-4 py-1 rounded hover:underline"
          >
            Back
          </button>
        ) : user ? (
          <div className="flex items-center text-sm md:text-base space-x-4">
            <span>Welcome, {name}</span>
            <button
              onClick={onLogout}
              className="text-white text-sm md:text-base px-3 py-1 rounded hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="text-white px-4 py-1 rounded hover:underline"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderBar;
