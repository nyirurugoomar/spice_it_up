import React, { useState, useEffect } from "react";
import { myProfile } from "../assets/assets";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { getUserRecipes } from "../api/recipe";
const tabs = ["My Recipes", "Saved Recipes", "Liked Recipes"];
import { deleteRecipe } from "../api/recipe";
import { updateRecipe } from "../api/recipe";

function MyProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [myProfile, setMyProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);
  let username = "";
  let email = "";
  const authData = localStorage.getItem("auth");
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      if (parsed && parsed.user && parsed.user.username) {
        username = parsed.user.username;
        email = parsed.user.email;
      }
    } catch (e) {
      username = "";
      email = "";
    }
  }
  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      setMyProfile(myProfile.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  const handleEdit = (recipe) => {
    setEditRecipe(recipe);
    setShowEditModal(true);
  };
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getUserRecipes();
        setMyProfile(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyProfile();
  }, []);

  // Recipe Skeleton Component
  const RecipeSkeleton = () => (
    <div className="bg-[#23281f] rounded-lg overflow-hidden shadow-lg p-4 animate-pulse">
      <div className="w-full h-48 bg-[#2B3328] rounded-lg"></div>
      <div className="mt-4">
        <div className="h-6 bg-[#2B3328] rounded w-3/4"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-8 bg-[#2B3328] rounded w-20"></div>
          <div className="h-8 bg-[#2B3328] rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <img
          src={assets.userProfile}
          alt="Profile"
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-gray-300 object-cover"
        />
        <h2 className="text-white text-xl sm:text-2xl font-bold mt-3 sm:mt-4 text-center">{username}</h2>
        <p className="text-gray-400 text-sm sm:text-base text-center">{email}</p>
        <p className="text-gray-500 text-xs sm:text-sm text-center">
          Joined {new Date().getFullYear()}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 sm:space-x-8 border-b border-[#23281f] w-full max-w-4xl mb-4 sm:mb-6 overflow-x-auto">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            className={`pb-2 text-white font-medium transition whitespace-nowrap text-sm sm:text-base ${
              activeTab === idx
                ? "border-b-2 border-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

     
      <div className="w-full max-w-4xl">
        {activeTab === 0 && (
          <>
            <h3 className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">My Recipes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {isLoading
                ? // Show 6 skeleton cards while loading
                  Array(6)
                    .fill(null)
                    .map((_, index) => <RecipeSkeleton key={index} />)
                : myProfile.map((recipe) => (
                    <div
                      key={recipe._id}
                      className="bg-[#23281f] rounded-lg overflow-hidden shadow-lg p-3 sm:p-4"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover"
                        onError={(e) => {
                          console.error("Image failed to load:", recipe.image);
                          e.target.style.display = "none";
                          const placeholder = document.createElement("div");
                          placeholder.className =
                            "w-full h-32 sm:h-40 md:h-48 bg-gray-300 flex items-center justify-center";
                          placeholder.innerHTML =
                            '<p class="text-gray-600 text-xs sm:text-sm">Image not available</p>';
                          e.target.parentNode.appendChild(placeholder);
                        }}
                      />
                      <h2 className="text-white text-base sm:text-lg font-bold mt-3 sm:mt-4 line-clamp-2">
                        {recipe.title}
                      </h2>
                      <div className="flex justify-between items-center mt-3 sm:mt-4 gap-2">
                        <button
                          onClick={() => handleEdit(recipe)}
                          className="text-black bg-[#54D12B] text-xs sm:text-sm font-bold px-2 sm:px-4 py-1.5 sm:py-2 rounded-md flex-1 mr-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(recipe._id)}
                          className="text-white text-xs sm:text-sm font-bold bg-red-500 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md flex-1 ml-1"
                        >
                          Delete
                        </button>
                      </div>
                      {/* Add more details as needed */}
                    </div>
                  ))}
            </div>
          </>
        )}

        {activeTab === 1 && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="text-center px-4">
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Saved Recipes</h3>
              <p className="text-gray-400 text-base sm:text-lg">We're still working on this feature!</p>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="text-center px-4">
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Liked Recipes</h3>
              <p className="text-gray-400 text-base sm:text-lg">We're still working on this feature!</p>
            </div>
          </div>
        )}

        {/* Edit Modal Card */}
        {showEditModal && editRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-8 w-full max-w-[400px] relative max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl sm:text-2xl"
                onClick={() => setShowEditModal(false)}
              >
                &times;
              </button>
              <h2 className="text-lg sm:text-xl font-bold mb-4">Edit Recipe</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await updateRecipe(editRecipe._id, editRecipe);
                    setShowEditModal(false);
                    // Optionally, refresh the recipes list
                    setMyProfile((prev) =>
                      prev.map((r) =>
                        r._id === editRecipe._id ? editRecipe : r
                      )
                    );
                  } catch (error) {
                    alert("Failed to update recipe");
                  }
                }}
                className="flex flex-col gap-3 sm:gap-4"
              >
                <input
                  className="border p-2 sm:p-3 rounded text-sm sm:text-base"
                  placeholder="Title"
                  value={editRecipe.title}
                  onChange={(e) =>
                    setEditRecipe({ ...editRecipe, title: e.target.value })
                  }
                />
                <textarea
                  className="border p-2 sm:p-3 rounded text-sm sm:text-base min-h-[80px]"
                  placeholder="Ingredients"
                  value={editRecipe.ingredients}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      ingredients: e.target.value,
                    })
                  }
                />
                <textarea
                  className="border p-2 sm:p-3 rounded text-sm sm:text-base min-h-[80px]"
                  placeholder="Instructions"
                  value={editRecipe.instructions}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      instructions: e.target.value,
                    })
                  }
                />
                <input
                  className="border p-2 sm:p-3 rounded text-sm sm:text-base"
                  placeholder="Preparation"
                  value={editRecipe.preparation}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      preparation: e.target.value,
                    })
                  }
                />
                <input
                  className="border p-2 sm:p-3 rounded text-sm sm:text-base"
                  placeholder="Cooking Time"
                  value={editRecipe.CookingTime}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      CookingTime: e.target.value,
                    })
                  }
                />
                {/* You can add image upload here if you want */}
                <button
                  type="submit"
                  className="bg-[#54D12B] text-white px-4 py-2 sm:py-3 rounded text-sm sm:text-base font-medium"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center space-x-2 sm:space-x-4 mt-6 sm:mt-8">
        <button
          className="text-gray-400 hover:text-white text-sm sm:text-base"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          &lt;
        </button>
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${
              page === num
                ? "bg-[#23281f] text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}
        <button
          className="text-gray-400 hover:text-white text-sm sm:text-base"
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
