import api from './axios';

export const getRecipes = async () => {
  const response = await api.get('/recipes');
  return response.data;
};

export const getRecipeById = async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
};

export const createRecipe = async (recipe) => {
    const formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);
    formData.append('preparation', recipe.preparation);
    formData.append('CookingTime', recipe.CookingTime);
    if (recipe.image) {
      formData.append('image', recipe.image);
    }
  
    console.log('BODY:', formData);
    console.log('FILE:', formData.get('image'));
  
    const response = await api.post('/recipes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

export const updateRecipe = async (id, recipe) => { 
    const response = await api.put(`/recipes/${id}`, recipe);
    return response.data;
};

export const deleteRecipe = async (id) => {
    const response = await api.delete(`/recipes/${id}`);
    return response.data;
};

export const getUserRecipes = async () => {
    const response = await api.get('/user-recipes');
    return response.data;
};

export const searchRecipes = async (search, page = 1, limit = 10) => {
    const response = await api.get(`/recipes?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`);
    return response.data;
  };



