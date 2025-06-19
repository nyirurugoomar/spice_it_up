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
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-4xl font-bold text-white font-manrope">
        Create your account
      </h1>
      <form className="flex flex-col  gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white ">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter  your username"
            className="w-[500px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white ">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter  your email"
            className="w-[500px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white ">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter  your password"
            className="w-[500px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        

        <button
          type="submit"
          className={`w-full p-2 rounded-md text-black font-bold ${
            isLoading ? 'bg-[#6B9B5A] cursor-not-allowed' : 'bg-[#54D12B] hover:bg-[#4BC025]'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-col">
          <p className="text-[#A6B5A1] text-[14px]">
            Already have an account?{" "}
            <Link className="text-white hover:underline" to="/">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
