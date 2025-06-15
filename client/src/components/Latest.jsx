import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../api/recipe";

function Latest({ recipes: propRecipes, title = "Latest Recipes" }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!propRecipes) {
      const fetchRecipes = async () => {
        try {
          const data = await getRecipes();
          setRecipes(data.recipes);
        } catch (error) {
          console.error('Failed to fetch recipes:', error);
        }
      };
      fetchRecipes();
    }
  }, [propRecipes]);

  const displayRecipes = propRecipes || recipes;

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-white text-[22px] font-bold font-manrope">
        {title}
      </h1>
      <div className="flex flex-col gap-6">
        {displayRecipes.map((item) => (
          <Link to={`/recipe/${item._id}`} key={item._id}>
            <div className="text-white cursor-pointer hover:bg-[#2B3328] p-4 rounded-xl hover:translate-y-[-10px] transition-all duration-500 flex justify-between items-center">
              <div className="flex flex-col gap-3 max-w-md">
                <h2 className="text-xl font-semibold text-white text-[16px]">{item.title}</h2>
                <p className="text-[#A6B5A1] text-[14px]">{item.ingredients}</p>
                <p className="text-[#A6B5A1] text-[14px]">
                  By {item.createdBy?.username || "Unknown"}
                </p>
                <button className="bg-[#54D12B] px-4 py-1.5 rounded-md flex items-center gap-2 text-sm w-fit mt-2">
                  More Details
                </button>
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="w-[320px] h-[171px] rounded-lg object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Latest;