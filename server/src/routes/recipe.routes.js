const express = require('express');
const router = express.Router()
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

router.get('/',auth, getAllRecipes); 
router.get('/:id',auth, getRecipeById);
router.post('/', auth, upload.single('image'), createRecipe);
router.put('/:id', auth, updateRecipe);
router.delete('/:id', auth, deleteRecipe);
router.get('/user-recipes', auth, getUserRecipes);

module.exports = router;