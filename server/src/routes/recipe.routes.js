const express = require('express');
const router = express.Router();
const { 
    createRecipe, 
    upload, 
    getAllRecipes, 
    getRecipeById, 
    updateRecipe, 
    deleteRecipe,
    getUserRecipes
  } = require('../controllers/recipe.controller');
const auth = require('../middleware/auth');

// Recipe routes
router.get('/recipes', auth, getAllRecipes);
router.get('/recipes/:id', auth, getRecipeById);
router.post('/recipes', auth, upload.single('image'), createRecipe);
router.put('/recipes/:id', auth, updateRecipe);
router.delete('/recipes/:id', auth, deleteRecipe);
router.get('/user-recipes', auth, getUserRecipes);

module.exports = router;