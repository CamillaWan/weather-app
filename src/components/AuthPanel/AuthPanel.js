import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const AuthPanel = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", content: "" });
    setLoading(true);

    const { name, email, password, confirmPassword } = form;

    // Registration only: validation
    if (!isLogin) {
      if (password !== confirmPassword) {
        setMessage({
          type: "error",
          content: "Passwords do not match.",
        });
        setLoading(false);
        return;
      }
      if (
        password.length < 6 ||
        !/[a-zA-Z]/.test(password) ||
        !/\d/.test(password)
      ) {
        setMessage({
          type: "error",
          content:
            "Password must be at least 6 characters and include both letters and numbers.",
        });
        setLoading(false);
        return;
      }
    }

    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: "https://camillas-weather-app.vercel.app",
        },
      });
    }

    if (result.error) {
      setMessage({ type: "error", content: result.error.message });
    } else {
      if (isLogin) {
        onLoginSuccess(result.data.user);
      } else {
        setMessage({
          type: "success",
          content: "Registration successful! Please log in.",
        });
        setIsLogin(true);
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Please wait…" : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p
        className="mt-4 text-center text-sm text-blue-600 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Click to register"
          : "Already have an account? Click to login"}
      </p>

      {message.content && (
        <p
          className={`mt-2 text-center text-sm ${
            message.type === "error" ? "text-red-500" : "text-green-600"
          }`}
        >
          {message.content}
        </p>
      )}
    </div>
  );
};

export default AuthPanel;
