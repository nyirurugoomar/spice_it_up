import React from "react";
import Explore from "./pages/Explore";
import CreateRecipe from "./pages/CreateRecipe";
import Signup from "./pages/Signup";
import Signin from "./pages/signin";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MyProfile from "./pages/MyProfile";
import RecipeDetails from "./pages/RecipeDetails";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div className="mx-2 sm:mx-10 ">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
          
        <Route element={<MainLayout/>}>
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/explore" element={<ProtectedRoute>
              <Explore />
            </ProtectedRoute>} />
            <Route path="/create-recipe" element={<ProtectedRoute>
              <CreateRecipe />
            </ProtectedRoute>} />
            <Route path="/my-profile" element={<ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>} />
            <Route path="/recipe/:id" element={<ProtectedRoute>
              <RecipeDetails />
            </ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
