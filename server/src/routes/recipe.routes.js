const express = require('express');
const router = express.Router()
const { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipe.controller');
const auth = require('../middleware/auth');

router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipeById);
router.post('/recipes', auth, createRecipe);
router.put('/recipes/:id', auth, updateRecipe);
router.delete('/recipes/:id', auth, deleteRecipe);

module.exports = router;