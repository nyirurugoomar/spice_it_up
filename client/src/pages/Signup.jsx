import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await signup({
        username,
        email,
        password,
      });
      
      if (response && response.token) {
        localStorage.setItem('auth', JSON.stringify(response));
        console.log(response);
        navigate("/home");
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 gap-6 sm:gap-8 lg:gap-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-manrope text-center">
        Create your account
      </h1>
      <form className="flex flex-col gap-4 sm:gap-6 w-full max-w-md sm:max-w-lg lg:max-w-xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white text-sm sm:text-base">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter  your username"
            className="w-full bg-[#2E3829] p-3 sm:p-4 outline-none rounded-[12px] text-white text-[14px] sm:text-[16px] placeholder-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white text-sm sm:text-base">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter  your email"
            className="w-full bg-[#2E3829] p-3 sm:p-4 outline-none rounded-[12px] text-white text-[14px] sm:text-[16px] placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white text-sm sm:text-base">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter  your password"
            className="w-full bg-[#2E3829] p-3 sm:p-4 outline-none rounded-[12px] text-white text-[14px] sm:text-[16px] placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        

        <button
          type="submit"
            className={`bg-[#96DB74] text-black font-semibold px-4 sm:px-6 py-3 sm:py-2 rounded-full text-sm sm:text-base transition-colors duration-200 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#8cd066] active:bg-[#7bbf5a]'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-col">
          <p className="text-[#A6B5A1] text-[14px]">
            Already have an account?{" "}
            <Link className="text-[#96DB74] hover:underline transition-colors duration-200" to="/">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
