import React from "react";
import Explore from "./pages/Explore";
import CreateRecipe from "./pages/CreateRecipe";
import Signup from "./pages/Signup";
import Signin from "./pages/signin";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div className="mx-10 sm:mx-10 ">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
          
        <Route element={<MainLayout/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
