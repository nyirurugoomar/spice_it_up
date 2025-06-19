import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signin } from "../api/auth";
import { testBackendConnection } from "../api/axios";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(null);

  useEffect(() => {
    const checkBackendConnection = async () => {
      const connected = await testBackendConnection();
      setIsBackendConnected(connected);
      if (!connected) {
        setError("Cannot connect to the server. Please try again later.");
      }
    };
    checkBackendConnection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isBackendConnected) {
      setError("Cannot connect to the server. Please try again later.");
      return;
    }

    setError("");
    setIsLoading(true);
    
    try {
      console.log("Attempting to sign in...");
      const response = await signin({ email, password });
      console.log("Sign in response:", response);
      
      if (response && response.token) {
        localStorage.setItem('auth', JSON.stringify(response));
        navigate("/home");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response) {

        console.error("Error response:", err.response.data);
        setError(err.response.data.message || "Login failed. Please try again.");
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received:", err.request);
        setError("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", err.message);
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 gap-6 sm:gap-8 lg:gap-10">
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white font-manrope text-center">
        Welcome back
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm sm:text-base">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-[#2E3829] p-3 sm:p-4 outline-none rounded-[12px] text-white text-[14px] sm:text-[16px] placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm sm:text-base">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full bg-[#2E3829] p-3 sm:p-4 outline-none rounded-[12px] text-white text-[14px] sm:text-[16px] placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>}
        <button 
          type="submit" 
          className={`bg-[#96DB74] text-black font-semibold px-4 sm:px-6 py-3 sm:py-2 rounded-full text-sm sm:text-base transition-colors duration-200 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#8cd066] active:bg-[#7bbf5a]'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="text-white text-center text-sm sm:text-base">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#96DB74] hover:underline transition-colors duration-200">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;