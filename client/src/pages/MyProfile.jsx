import React, { useState } from 'react';
import { myProfile } from '../assets/assets';
import { assets } from '../assets/assets'

const tabs = ['My Recipes', 'Saved Recipes', 'Liked Recipes'];

function MyProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen  flex flex-col items-center py-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={assets.userProfile}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-gray-300 object-cover"
        />
        <h2 className="text-white text-2xl font-bold mt-4">Emily Carter</h2>
        <p className="text-gray-400">@emily_carter</p>
        <p className="text-gray-500 text-sm">Joined in 2021</p>
        <button className="mt-4 px-8 py-2 rounded bg-[#23281f] text-white font-semibold hover:bg-[#2e3526] transition">
          Follow
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-[#23281f] w-full max-w-4xl mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            className={`pb-2 text-white font-medium transition ${
              activeTab === idx
                ? 'border-b-2 border-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Recipes Section */}
      <div className="w-full max-w-4xl">
        <h3 className="text-white text-xl font-bold mb-6">My Recipes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {myProfile.map((recipe, idx) => (
            <div
              key={idx}
              className="bg-[#23281f] rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-white font-semibold text-lg">
                  {recipe.title}
                </h4>
                <p className="text-gray-400 text-sm">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center space-x-4 mt-8">
        <button
          className="text-gray-400 hover:text-white"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          &lt;
        </button>
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              page === num
                ? 'bg-[#23281f] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}
        <button
          className="text-gray-400 hover:text-white"
          disabled={page === 3}
          onClick={() => setPage(page + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default MyProfile;