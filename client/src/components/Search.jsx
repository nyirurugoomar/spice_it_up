import React, { useState, useEffect } from "react";
import { searchRecipes } from "../api/recipe";

function Search({ onResults }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim() === "") {
        onResults([]); // Clear search results, show latest
      } else {
        const data = await searchRecipes(query);
        onResults(data.recipes);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(delayDebounce);
  }, [query, onResults]);

  return (
    <form className="flex flex-row items-center justify-center gap-10" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search recipe ,Chef, Ingredients, Instructions"
        className="w-full bg-[#2E3829] p-4 outline-none rounded-[12px] text-white text-[16px]"
      />
    </form>
  );
}

export default Search;