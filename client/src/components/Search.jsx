import React, { useState, useEffect } from "react";
import { searchRecipes } from "../api/recipe";

function Search({ onResults }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim() === "") {
        onResults([]); 
      } else {
        const data = await searchRecipes(query);
        onResults(data.recipes);
      }
    }, 400); 

    return () => clearTimeout(delayDebounce);
  }, [query, onResults]);

  return (
   <div className="w-full md:w-full p-3 sm:p-4 lg:p-6 text-[14px] sm:text-[16px] text-gray-400">
     <form className="flex flex-row gap-10" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search recipe ,Chef, Ingredients, Instructions"
        className="w-full bg-[#2E3829] p-4 outline-none rounded-[12px] text-white text-[16px]"
      />
    </form>
   </div>
  );
}

export default Search;