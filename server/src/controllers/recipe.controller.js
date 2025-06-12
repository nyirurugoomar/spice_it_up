const Recipe = require('../models/recipe.model');

exports.getAllRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
exports.createRecipe = async (req, res) => {
    try {
      const recipe = new Recipe(req.body);
      await recipe.save();
      res.status(201).json({ message: 'Recipe created successfully', recipe });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  exports.getRecipeById = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.updateRecipe = async (req, res) => {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
      res.status(200).json({ message: 'Recipe updated', updatedRecipe });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete a recipe by ID
  exports.deleteRecipe = async (req, res) => {
    try {
      const deleted = await Recipe.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Recipe not found' });
      res.status(200).json({ message: 'Recipe deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };