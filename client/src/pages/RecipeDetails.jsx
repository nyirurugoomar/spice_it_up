import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../api/recipe';
import { Link } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecipeById(id);
      setRecipe(data);
    };
    fetchData();
  }, [id]);

  if (!recipe) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white p-6">
      <h1 className='text-white underline py-6'><Link to='/home'>Back to Home</Link></h1>
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-[1128px] h-[619px] rounded-lg mb-4" />
      <div className='flex flex-col gap-4'>
      <h2 className="text-2xl font-semibold text-white">Ingredients:</h2>
      <p className="text-gray-300 mb-4">{recipe.ingredients}</p>
      <h2 className="text-2xl font-semibold text-white">Instructions:</h2>
      <p className="text-gray-300">{recipe.instructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetails;
