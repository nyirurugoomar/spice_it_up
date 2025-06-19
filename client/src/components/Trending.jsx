import React, { useState } from 'react';
import { trending } from '../assets/assets';

function Trending() {
  const [startIdx, setStartIdx] = useState(0);
  
  // Responsive cards to show based on screen size
  const getCardsToShow = () => {
    if (window.innerWidth < 640) return 1; // Mobile: 1 card
    if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
    return 3; // Desktop: 3 cards
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  // Update cards to show on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white font-manrope">Trending Recipes</h1>
      
      {/* Mobile: Stack cards vertically */}
      <div className="block sm:hidden">
        <div className="flex flex-col gap-4">
          {visibleCards.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-[#23281f] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4">
                <h1 className="text-white text-lg font-bold font-manrope mb-2">{item.title}</h1>
                <p className="text-[#A6B5A1] text-sm font-manrope">{item.Ingredients}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile navigation dots */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.ceil(trending.length / cardsToShow) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIdx(index * cardsToShow)}
              className={`w-2 h-2 rounded-full transition-all ${
                startIdx === index * cardsToShow ? 'bg-[#96DB74]' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop/Tablet: Horizontal carousel */}
      <div className="hidden sm:flex items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={startIdx === 0}
          className="text-white text-2xl sm:text-3xl px-2 py-1 disabled:opacity-30 hover:bg-[#2E3829] rounded-full transition-all"
        >
          &#8592;
        </button>
        
        <div className="flex flex-row gap-4 sm:gap-6 lg:gap-10 overflow-hidden">
          {visibleCards.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 w-[280px] sm:w-[300px] lg:w-[320px] bg-[#23281f] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[160px] sm:h-[170px] lg:h-[180px] object-cover"
              />
              <div className="p-3 sm:p-4">
                <h1 className="text-white text-base sm:text-lg lg:text-xl font-bold font-manrope mb-1 sm:mb-2">{item.title}</h1>
                <p className="text-[#A6B5A1] text-sm sm:text-base font-manrope">{item.Ingredients}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={handleNext}
          disabled={startIdx >= trending.length - cardsToShow}
          className="text-white text-2xl sm:text-3xl px-2 py-1 disabled:opacity-30 hover:bg-[#2E3829] rounded-full transition-all"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default Trending;