import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signin } from "../api/auth";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signin({ email, password });
      localStorage.setItem('auth', JSON.stringify(response));
      console.log(response);
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-4xl font-bold text-white font-manrope">
        Welcome back
      </h1>
      <form className="flex flex-col  gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white ">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter  your username"
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
            id="password"
            placeholder="Enter  your password"
            className="w-[500px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-col gap-2">
          <h1 className="text-white cursor-pointer">Forgot Password?</h1>
        </div>

        <button
          type="submit"
          className="w-full p-2 rounded-md bg-[#54D12B] text-black font-bold cursor-pointer"
        >
          Log in
        </button>
        <div className="flex flex-col">
          <p className="text-[#A6B5A1] text-[14px]">
            Don't have an account?{" "}
            <Link className="text-white hover:underline" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signin;
