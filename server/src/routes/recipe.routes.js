const express = require('express');
const router = express.Router()
const { 
    createRecipe, 
    upload, 
    getAllRecipes, 
    getRecipeById, 
    updateRecipe, 
    deleteRecipe 
  } = require('../controllers/recipe.controller');
const auth = require('../middleware/auth');

router.get('/recipes',auth, getAllRecipes); 
router.get('/recipes/:id',auth, getRecipeById);
router.post('/recipes', auth, upload.single('image'), createRecipe);
router.put('/recipes/:id', auth, updateRecipe);
router.delete('/recipes/:id', auth, deleteRecipe);

module.exports = router;