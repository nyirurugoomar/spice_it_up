import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let username = "";
  const authData = localStorage.getItem("auth");
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      if (parsed && parsed.user && parsed.user.username) {
        username = parsed.user.username;
      }
    } catch (e) {
      username = "";
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400 px-4 sm:px-6 lg:px-8">
      <img
        onClick={() => navigate("/home")}
        className="w-20 sm:w-24 md:w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />
      
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-start gap-5 font-medium cursor-pointer text-white">
        <NavLink to="/home">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-white w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/explore">
          <li className="py-1">Explore</li>
          <hr className="border-none outline-none h-0.5 bg-white w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/create-recipe">
          <li className="py-1">Create Recipe</li>
          <hr className="border-none outline-none h-0.5 bg-white w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* Desktop Profile */}
      <div className="hidden md:flex items-center gap-5">
        {username && (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <p className="text-white">{username}</p>
            <img
              className="w-6 h-6 rounded-full bg-white"
              src={assets.userProfile}
              alt="profile"
            />
            <div className="absolute top-0 right-0 pt-20 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={handleLogout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed top-0 right-0 h-full w-64 bg-[#23281f] shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white p-2"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* User Profile Section */}
              {username && (
                <div className="px-4 py-6 border-b border-gray-600">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-full bg-white"
                      src={assets.userProfile}
                      alt="profile"
                    />
                    <div>
                      <p className="text-white font-medium">{username}</p>
                      <p className="text-gray-400 text-sm">Welcome back!</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-6">
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() => handleNavigation("/home")}
                      className="w-full text-left text-white font-medium py-3 px-4 rounded-lg hover:bg-[#2E3829] transition-colors"
                    >
                      HOME
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation("/explore")}
                      className="w-full text-left text-white font-medium py-3 px-4 rounded-lg hover:bg-[#2E3829] transition-colors"
                    >
                      Explore
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation("/create-recipe")}
                      className="w-full text-left text-white font-medium py-3 px-4 rounded-lg hover:bg-[#2E3829] transition-colors"
                    >
                      Create Recipe
                    </button>
                  </li>
                  
                  
                </ul>
              </nav>

              {/* Profile Actions */}
              {username && (
                <div className="px-4 py-6 border-t border-gray-600">
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => handleNavigation("/my-profile")}
                        className="w-full text-left text-white font-medium py-3 px-4 rounded-lg hover:bg-[#2E3829] transition-colors flex items-center gap-3"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        My Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left text-red-400 font-medium py-3 px-4 rounded-lg hover:bg-red-900 hover:text-red-300 transition-colors flex items-center gap-3"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
