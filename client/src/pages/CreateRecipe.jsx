import React, { useRef, useState } from "react";
import { createRecipe } from "../api/recipe";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [preparation, setPreparation] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!title || !ingredients || !instructions || !preparation || !cookingTime || !image) {
      setError("All fields are required, including an image.");
      return;
    }
    
    // Check if user is authenticated
    const authData = localStorage.getItem('auth');
    if (!authData) {
      setError("You are not logged in. Please sign in again.");
      return;
    }
    
    try {
      const parsed = JSON.parse(authData);
      if (!parsed.token) {
        setError("Authentication token is missing. Please sign in again.");
        return;
      }
      
      console.log('User is authenticated with token:', parsed.token.substring(0, 20) + '...');
      
      setIsSubmitting(true);
      const result = await createRecipe({
        title,
        ingredients,
        instructions,
        preparation,
        CookingTime: cookingTime,
        image,
      });
      console.log('Recipe creation result:', result);
      setSuccess("Recipe created successfully");
      navigate("/home");
    } catch (error) {
      console.error('Recipe creation error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(error.response.data.error || error.response.data.message || "Failed to create recipe");
      } else if (error.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("Failed to create recipe: " + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-20">
      <h1 className="text-white text-4xl font-bold font-manrope">
        Create a New Recipe
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-white ">Recipe Title</label>
          <input
            type="text"
            placeholder="Enter the title of your recipe"
            className="w-[500px] bg-[#2E3829] p-4 outline-none rounded-[12px] text-white text-[16px]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white ">Ingredients</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Eggs, sugar..."
            className="w-[500px] h-[100px] bg-[#2E3829] p-4 outline-none rounded-[12px] text-white text-[16px]"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white ">Instructions</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Step 1: Mix the ingredients..."
            className="w-[500px] h-[100px] bg-[#2E3829] p-4 outline-none rounded-[12px] text-white text-[16px]"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white ">Preparation Time (minutes)</label>
          <input
            type="text"
            placeholder="e.g., 15min"
            className="w-[500px] bg-[#2E3829] p-4 outline-none rounded-[12px] text-white text-[16px]"
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white ">Cooking Time (minutes)</label>
          <input
            type="text"
            placeholder="e.g., 30min"
            className="w-[500px] bg-[#2E3829] p-4 outline-none rounded-[12px] text-white text-[16px]"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />
        </div>
        <div className="border-2 border-dashed border-gray-500 rounded-xl w-full max-w-3xl h-64 flex flex-col items-center justify-center gap-3">
          <h2 className="text-lg text-white font-semibold">Upload a Photo</h2>
          <p className="text-gray-300">Drag and drop or click to upload(Better to choose jpg, jpeg, png)</p>
          <button
            onClick={handleUploadClick}
            className="bg-[#2B3328] px-6 py-2 rounded-full text-white font-medium"
            type="button"
          >
            Upload
          </button>
          {selectedFile && (
            <p className="text-green-400">{selectedFile.name}</p>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setSelectedFile(e.target.files[0]);
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div className="w-full max-w-3xl flex justify-end mt-6">
          <button 
            className={`${
              isSubmitting 
                ? 'bg-[#6B9B5A] cursor-not-allowed' 
                : 'bg-[#96DB74] hover:bg-[#8cd066] cursor-pointer'
            } text-black font-semibold px-6 py-2 rounded-full flex items-center gap-2`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Submit Recipe'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipe;