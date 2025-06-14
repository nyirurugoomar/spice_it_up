const Recipe = require("../models/recipe.model");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

exports.getAllRecipes = async (req, res) => {
  try {
    // Get query params
    const { search = "", page = 1, limit = 10 } = req.query;

    // Build search filter
    const searchFilter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { ingredients: { $regex: search, $options: "i" } },
            { instructions: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Recipe.countDocuments(searchFilter);
    const recipes = await Recipe.find(searchFilter)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      recipes,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createRecipe = async (req, res) => {
  try {
    // If an image was uploaded, set the image path as a full URL
    let imageUrl = '';
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;
    }

    // Get user info from req.user (set by your auth middleware)
    const userId = req.user.id;
    const username = req.user.username;

    // Create the recipe with all required fields
    const recipe = new Recipe({
      ...req.body,
      image: imageUrl,
      createdBy: {
        id: userId,
        username: username
      }
    });

    await recipe.save();
    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
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
    if (!updatedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe updated", updatedRecipe });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.upload = upload;

