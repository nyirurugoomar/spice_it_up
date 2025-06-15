import React, { useState, useEffect } from "react";
import { myProfile } from "../assets/assets";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { getUserRecipes } from "../api/recipe";
import { Link } from "react-router-dom";
const tabs = ["My Recipes", "Saved Recipes", "Liked Recipes"];
import { deleteRecipe } from "../api/recipe";
import { updateRecipe } from "../api/recipe";

function MyProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [myProfile, setMyProfile] = useState([]);
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
      const data = await getUserRecipes();
      setMyProfile(data);
    };
    fetchMyProfile();
  }, []);

  return (
    <div className="min-h-screen  flex flex-col items-center py-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={assets.userProfile}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-gray-300 object-cover"
        />
        <h2 className="text-white text-2xl font-bold mt-4">{username}</h2>
        <p className="text-gray-400">{email}</p>
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
                ? "border-b-2 border-white"
                : "text-gray-400 hover:text-white"
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
          {myProfile.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-[#23281f] rounded-lg overflow-hidden shadow-lg p-4"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-white text-[18px] font-bold">
                {recipe.title}
              </h2>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEdit(recipe)}
                  className="text-black bg-[#54D12B] text-sm font-bold px-4 py-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="text-white text-sm font-bold bg-red-500 px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
        {/* Edit Modal Card */}
        {showEditModal && editRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-[400px] relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={() => setShowEditModal(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>
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
                className="flex flex-col gap-4"
              >
                <input
                  className="border p-2 rounded"
                  label="Title"
                  value={editRecipe.title}
                  onChange={(e) =>
                  setEditRecipe({ ...editRecipe, title: e.target.value })
                  }
                />
                <textarea
                  className="border p-2 rounded"
                  label="Ingredients"
                  value={editRecipe.ingredients}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      ingredients: e.target.value,
                    })
                  }
                />
                <textarea
                  className="border p-2 rounded"
                  label="Instructions"
                  value={editRecipe.instructions}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      instructions: e.target.value,
                    })
                  }
                />
                <input
                  className="border p-2 rounded"
                  label="Preparation"
                  value={editRecipe.preparation}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      preparation: e.target.value,
                    })
                  }
                />
                <input
                  className="border p-2 rounded"
                  label="Cooking Time"
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
                  className="bg-[#54D12B] text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
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
                ? "bg-[#23281f] text-white"
                : "text-gray-400 hover:text-white"
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
