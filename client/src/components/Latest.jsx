import React from 'react';
import { latest } from '../assets/assets';

function Latest() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-white text-[22px] font-bold font-manrope">Latest Recipes</h1>

      <div className="flex flex-col gap-6">
        {latest.map((item, index) => (
          <div
            key={index}
            className=" text-white  cursor-pointer hover:bg-[#2B3328] p-4 rounded-xl hover:translate-y-[-10px] transition-all duration-500  flex justify-between items-center"
          >
            {/* Text Section */}
            <div className="flex flex-col gap-3 max-w-md">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-400">{item.Ingredients}</p>

              <button className="bg-[#54D12B] px-4 py-1.5 rounded-md flex items-center gap-2 text-sm w-fit mt-2">
                More Details
              </button>
            </div>

            {/* Image Section */}
            <img
              src={item.image}
              alt={item.title}
              className="w-[320px] h-[171px] rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Latest;
