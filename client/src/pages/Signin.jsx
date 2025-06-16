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
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
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
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-4xl font-bold text-white font-manrope">
        Welcome back
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-white">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-[500px] bg-[#2E3829] p-4 outline-none rounded-[12px] text-white text-[16px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-[500px] bg-[#2E3829] p-4 outline-none rounded-[12px] text-white text-[16px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button 
          type="submit" 
          className={`bg-[#96DB74] text-black font-semibold px-6 py-2 rounded-full ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#8cd066]'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="text-white text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#96DB74] hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;