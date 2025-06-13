import React, { useState } from 'react';
import { trending } from '../assets/assets';

function Trending() {
  const [startIdx, setStartIdx] = useState(0);
  const cardsToShow = 3;

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIdx((prev) =>
      Math.min(prev + 1, trending.length - cardsToShow)
    );
  };

  const visibleCards = trending.slice(startIdx, startIdx + cardsToShow);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-white text-[22px] font-bold font-manrope">Trending Recipes</h1>
      <div className="flex items-center gap-4">
 
        <button
          onClick={handlePrev}
          disabled={startIdx === 0}
          className="text-white text-3xl px-2 disabled:opacity-30"
        >
          &#8592;
        </button>
        {/* Cards */}
        <div className="flex flex-row gap-10">
          {visibleCards.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 w-[320px] h-[320px] bg-[#23281f] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[180px] object-cover"
              />
              <h1 className="text-white text-[20px] font-bold font-manrope px-4 mt-2">{item.title}</h1>
              <p className="text-[#A6B5A1] text-[16px] font-manrope px-4">{item.Ingredients}</p>
            </div>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={startIdx >= trending.length - cardsToShow}
          className="text-white text-3xl px-2 disabled:opacity-30"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default Trending;